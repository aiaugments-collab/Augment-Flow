'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from './logger';
import { GMAIL_FUNCTIONS, AgentFunctionResponse, FunctionCall } from './gmail-functions';

const API_KEY = 'AIzaSyCNavdb7Ws3EPwjDsy4j5P9VqxyKyW8wTY';

export interface EmailGenerationRequest {
  userRequest: string;
  recipientEmail?: string;
  context?: string;
}

export interface GeneratedEmail {
  to: string[];
  subject: string;
  body: string;
  tone: 'professional' | 'casual' | 'formal';
  cc?: string[];
  bcc?: string[];
}

const genAI = new GoogleGenerativeAI(API_KEY);

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateEmail(request: EmailGenerationRequest): Promise<GeneratedEmail> {
    try {
      logger.info('🤖 Starting Gemini AI email generation', { 
        userRequest: request.userRequest,
        recipientEmail: request.recipientEmail,
        context: request.context,
        requestLength: request.userRequest.length
      });

      const prompt = this.createEmailGenerationPrompt(request);
      logger.debug('📝 Gemini prompt created', { 
        promptLength: prompt,
        fullPrompt: prompt
      });
      
      logger.debug('🔄 Calling Gemini API...');
      const startTime = Date.now()
      
      const result = await this.model.generateContent(prompt);
      logger.debug('🔍 Raw Gemini result object', {
        result: result,
        resultKeys: result ? Object.keys(result) : []
      });
      
      const response = await result.response;
      logger.debug('🔍 Raw Gemini response object', {
        response: response,
        responseKeys: response ? Object.keys(response) : []
      });
      
      const text = response.text();
      logger.debug('🔍 Extracted text from response', {
        textType: typeof text,
        textContent: text,
        textLength: text?.length || 0
      });
      
      const endTime = Date.now();
      logger.info('✅ Gemini API call completed', { 
        responseTime: `${endTime - startTime}ms`,
        responseLength: text.length,
        fullResponse: text
      });

      logger.debug('🔍 Parsing Gemini response...');
      const email = this.parseEmailResponse(text, request);
      
      logger.info('📧 Email generated successfully by Gemini', { 
        to: email.to, 
        subject: email.subject,
        bodyLength: email.body.length,
        fullEmailBody: email.body,
        tone: email.tone
      });
      
      return email;
    } catch (error) {
      logger.error('❌ Error generating email with Gemini', {
        error: error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        errorType: typeof error,
        errorName: error instanceof Error ? error.name : undefined,
        request: request
      });
      
      // No fallback - let it fail
      throw error;
    }
  }

  async decideGmailFunctions(userRequest: string, context?: string): Promise<AgentFunctionResponse> {
    try {
      logger.info('🧠 Analyzing user request for Gmail functions', {
        userRequest,
        context,
        availableFunctions: GMAIL_FUNCTIONS.map(f => f.name)
      });

      const prompt = this.createFunctionCallingPrompt(userRequest, context);
      
      logger.debug('📝 Function calling prompt created', {
        promptLength: prompt.length,
        fullPrompt: prompt
      });

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      logger.debug('🔍 Gemini function response received', {
        responseLength: text.length,
        fullResponse: text
      });

      // Parse the function calling response
      const functionResponse = this.parseFunctionResponse(text, userRequest);
      
      logger.info('🎯 Function calling analysis completed', {
        hasFunctionCalls: !!(functionResponse.function_calls && functionResponse.function_calls.length > 0),
        functionCount: functionResponse.function_calls?.length || 0,
        functions: functionResponse.function_calls?.map(f => f.name) || [],
        completed: functionResponse.completed
      });

      return functionResponse;
    } catch (error) {
      logger.error('❌ Error in function calling analysis', error);
      throw error;
    }
  }

  private createFunctionCallingPrompt(userRequest: string, context?: string): string {
    const functionsDoc = GMAIL_FUNCTIONS.map(func => 
      `${func.name}: ${func.description}\nParameters: ${JSON.stringify(func.parameters, null, 2)}\n`
    ).join('\n');

    return `You are an intelligent Gmail assistant. Analyze the user's request and decide which Gmail functions to call.

User Request: "${userRequest}"
${context ? `Context: ${context}` : ''}

Available Gmail Functions:
${functionsDoc}

IMPORTANT RULES:
1. Respond with ONLY a JSON object
2. If you need to call functions, include them in "function_calls" array
3. If you have a message for the user, include it in "message"
4. Set "completed" to true if no more functions are needed
5. You can call multiple functions in sequence
6. Always include proper error handling

Examples:

User: "Send an email to john@company.com about the meeting"
Response:
{
  "message": "I'll send that email for you.",
  "function_calls": [
    {
      "name": "sendEmail",
      "arguments": {
        "to": ["john@company.com"],
        "subject": "Meeting",
        "body": "Regarding the meeting we discussed."
      }
    }
  ],
  "completed": true
}

User: "Find emails from Sarah and reply to the latest one"
Response:
{
  "message": "I'll search for emails from Sarah first.",
  "function_calls": [
    {
      "name": "searchEmails",
      "arguments": {
        "query": "from:sarah",
        "maxResults": 5
      }
    }
  ],
  "completed": false
}

User: "What are my unread emails?"
Response:
{
  "message": "Let me check your unread emails and show you the details.",
  "function_calls": [
    {
      "name": "getEmails",
      "arguments": {
        "folder": "INBOX",
        "unreadOnly": true,
        "maxResults": 10
      }
    }
  ],
  "completed": true
}

Now analyze this request and respond with the appropriate JSON:`;
  }

  private parseFunctionResponse(aiResponse: string, userRequest: string): AgentFunctionResponse {
    try {
      logger.debug('🔍 Parsing function calling response', {
        responseLength: aiResponse.length,
        responsePreview: aiResponse.substring(0, 200) + '...'
      });

      // Extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        logger.debug('✅ Successfully parsed function response', {
          hasMessage: !!parsed.message,
          functionCallCount: parsed.function_calls?.length || 0,
          completed: parsed.completed
        });

        return {
          message: parsed.message,
          function_calls: parsed.function_calls || [],
          completed: parsed.completed !== false // Default to true if not specified
        };
      } else {
        logger.warn('❌ No JSON found in function response, treating as message only');
        return {
          message: aiResponse,
          function_calls: [],
          completed: true
        };
      }
    } catch (error) {
      logger.error('❌ Error parsing function response', {
        error,
        aiResponse
      });
      
      // Fallback response
      return {
        message: `I had trouble understanding that request. Could you please rephrase it?`,
        function_calls: [],
        completed: true
      };
    }
  }

  async generateEmailSummary(request: { userRequest: string; context?: string }): Promise<string> {
    try {
      const prompt = `Create a summary based on this request:

${request.userRequest}

${request.context ? `Context: ${request.context}` : ''}

Provide a clear, concise summary. Focus on key information and action items if any.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text.trim();
    } catch (error) {
      logger.error('Error generating summary', error);
      return 'Unable to generate summary at this time.';
    }
  }

  private createEmailGenerationPrompt(request: EmailGenerationRequest): string {
    return `Parse this user request and generate an email. Respond with ONLY a JSON object:

"${request.userRequest}"

{
  "to": ["recipient@email.com"],
  "subject": "Email Subject",
  "body": "Email content here"
}`;
  }

  private parseEmailResponse(aiResponse: string, request: EmailGenerationRequest): GeneratedEmail {
    try {
      logger.debug('🔍 Parsing Gemini response', {
        responseLength: aiResponse.length,
        responsePreview: aiResponse.substring(0, 200) + '...'
      });

      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        logger.debug('✅ Found JSON in response', { 
          jsonString: jsonMatch[0] 
        });

        const parsedResponse = JSON.parse(jsonMatch[0]);
        
        logger.debug('✅ Successfully parsed JSON', { 
          parsedKeys: Object.keys(parsedResponse),
          parsedResponse: parsedResponse
        });

        // Validate and structure the response
        const result = {
          to: Array.isArray(parsedResponse.to) ? parsedResponse.to : [parsedResponse.to || request.recipientEmail || ''],
          subject: parsedResponse.subject || 'Message from Augment Flow',
          body: parsedResponse.body || 'This email was generated by Augment Flow.',
          tone: parsedResponse.tone || 'professional',
          cc: parsedResponse.cc,
          bcc: parsedResponse.bcc
        };

        logger.info('📧 Email parsed successfully', result);
        return result;
      } else {
        logger.error('❌ No JSON found in Gemini response', {
          fullResponse: aiResponse,
          responseType: typeof aiResponse
        });
      }
    } catch (error) {
      logger.error('❌ Error parsing Gemini AI response', {
        error: error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        aiResponse: aiResponse,
        responseLength: aiResponse?.length || 0
      });
    }

    logger.warn('🔄 Parsing failed, using fallback');
    return this.createFallbackEmail(request);
  }

  private createFallbackEmail(request: EmailGenerationRequest): GeneratedEmail {
    const recipients = this.extractEmailsFromText(request.userRequest);
    
    // Simple parsing: "Send email to john@email.com: Meeting at 3pm"
    const parts = request.userRequest.split(':');
    const subject = parts.length > 1 ? parts[1].trim() : 'Message';
    const body = parts.length > 1 ? `Hi,\n\n${parts[1].trim()}\n\nBest regards` : 'Hi,\n\nBest regards';
    
    return {
      to: recipients.length > 0 ? recipients : [request.recipientEmail || ''],
      subject: subject,
      body: body,
      tone: 'professional'
    };
  }

  private extractEmailsFromText(text: string): string[] {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
  }

  // Generate subject from body content
  async generateSubject(body: string): Promise<string> {
    try {
      const prompt = `Generate a concise, professional email subject line for this email content:

"${body}"

Respond with only the subject line, no quotes or additional text.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const subject = response.text().trim();

      return subject || 'Message from Augment Flow';
    } catch (error) {
      console.error('Error generating subject:', error);
      return 'Message from Augment Flow';
    }
  }

  // Generate body from subject and recipient
  async generateBody(subject: string, recipient: string): Promise<string> {
    try {
      const prompt = `Write a professional email body for:
Subject: "${subject}"
Recipient: ${recipient}

Write a complete, professional email body that matches the subject. Be concise but complete.
Respond with only the email body content, no subject line or greetings.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const body = response.text().trim();

      return body || 'This email was generated by Augment Flow.';
    } catch (error) {
      console.error('Error generating body:', error);
      return 'This email was generated by Augment Flow.';
    }
  }

  // Enhance incomplete emails
  async enhanceEmail(partialEmail: Partial<GeneratedEmail>): Promise<GeneratedEmail> {
    try {
      const prompt = `Enhance this incomplete email data:
${JSON.stringify(partialEmail, null, 2)}

Fill in missing fields and improve the content. Respond with a complete JSON object:
{
  "to": ["email@example.com"],
  "subject": "Complete subject",
  "body": "Complete professional email body",
  "tone": "professional"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseEmailResponse(text, { userRequest: '', recipientEmail: partialEmail.to?.[0] });
    } catch (error) {
      console.error('Error enhancing email:', error);
      return partialEmail as GeneratedEmail;
    }
  }
}

export const geminiService = new GeminiService();
