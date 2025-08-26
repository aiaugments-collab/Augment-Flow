'use client';

export interface AgentIntent {
  agent: 'gmail' | 'sheets' | 'calculator' | 'unknown';
  action: string;
  confidence: number;
  parameters: GmailIntent | CalculatorIntent | SheetsIntent | Record<string, unknown>;
}

export interface GmailIntent {
  action: 'send' | 'draft' | 'summarize' | 'search';
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject?: string;
  body?: string;
  query?: string;
}

export interface CalculatorIntent {
  action: 'calculate';
  expression: string;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'complex';
}

export interface SheetsIntent {
  action: 'add_row' | 'update_cell' | 'read_data';
  sheetName?: string;
  data?: unknown[];
  cellReference?: string;
  value?: unknown;
}

class AgentParser {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  }

  async parseUserInput(input: string): Promise<AgentIntent> {
    try {
      // Try local pattern matching first for speed
      const localResult = this.parseWithPatterns(input);
      if (localResult.confidence > 0.8) {
        return localResult;
      }

      // Fall back to Gemini API for complex parsing
      if (this.apiKey) {
        return await this.parseWithGemini(input);
      }

      // Return local result if no API key
      return localResult;
    } catch (error) {
      console.error('Error parsing user input:', error);
      return {
        agent: 'unknown',
        action: 'unknown',
        confidence: 0,
        parameters: {}
      };
    }
  }

  private parseWithPatterns(input: string): AgentIntent {
    const normalizedInput = input.toLowerCase().trim();

    // Gmail patterns
    if (this.matchesGmailPatterns(normalizedInput)) {
      return this.parseGmailIntent(input);
    }

    // Calculator patterns
    if (this.matchesCalculatorPatterns(normalizedInput)) {
      return this.parseCalculatorIntent(input);
    }

    // Sheets patterns
    if (this.matchesSheetsPatterns(normalizedInput)) {
      return this.parseSheetsIntent(input);
    }

    return {
      agent: 'unknown',
      action: 'unknown',
      confidence: 0,
      parameters: {}
    };
  }

  private async parseWithGemini(input: string): Promise<AgentIntent> {
    try {
      const prompt = `
You are an AI agent parser. Analyze the user input and determine which agent should handle it and what action to take.

Available agents:
1. gmail - for email operations (send, draft, summarize emails)
2. calculator - for mathematical calculations
3. sheets - for Google Sheets operations (add rows, update cells)

User input: "${input}"

Respond with a JSON object in this exact format:
{
  "agent": "gmail|calculator|sheets|unknown",
  "action": "specific_action",
  "confidence": 0.0-1.0,
  "parameters": {
    // Extracted parameters specific to the agent
  }
}

For Gmail agent, possible actions: send, draft, summarize, search
For Calculator agent, possible actions: calculate
For Sheets agent, possible actions: add_row, update_cell, read_data

Extract relevant parameters like email addresses, subjects, body text, numbers, expressions, etc.
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Gemini API request failed');
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        // Extract JSON from the response
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return {
            agent: result.agent || 'unknown',
            action: result.action || 'unknown',
            confidence: result.confidence || 0.5,
            parameters: result.parameters || {}
          };
        }
      }

      // Fallback to pattern matching
      return this.parseWithPatterns(input);
    } catch (error) {
      console.error('Error parsing with Gemini:', error);
      return this.parseWithPatterns(input);
    }
  }

  private matchesGmailPatterns(input: string): boolean {
    const gmailKeywords = [
      'email', 'mail', 'send', 'draft', 'compose', 'message',
      'gmail', '@', 'subject', 'recipient', 'inbox', 'summarize'
    ];
    return gmailKeywords.some(keyword => input.includes(keyword));
  }

  private matchesCalculatorPatterns(input: string): boolean {
    const mathKeywords = [
      'calculate', 'compute', 'math', 'add', 'subtract', 'multiply', 
      'divide', 'plus', 'minus', 'times', 'equals', 'what is'
    ];
    const hasNumbers = /\d/.test(input);
    const hasMathOperators = /[+\-*/=]/.test(input);
    
    return hasNumbers && (hasMathOperators || mathKeywords.some(keyword => input.includes(keyword)));
  }

  private matchesSheetsPatterns(input: string): boolean {
    const sheetsKeywords = [
      'sheet', 'spreadsheet', 'row', 'column', 'cell', 'table',
      'add', 'update', 'insert', 'google sheets', 'csv'
    ];
    return sheetsKeywords.some(keyword => input.includes(keyword));
  }

  private parseGmailIntent(input: string): AgentIntent {
    const normalizedInput = input.toLowerCase();
    
    // Determine action
    let action = 'send';
    if (normalizedInput.includes('draft') || normalizedInput.includes('compose')) {
      action = 'draft';
    } else if (normalizedInput.includes('summarize') || normalizedInput.includes('summary')) {
      action = 'summarize';
    } else if (normalizedInput.includes('search') || normalizedInput.includes('find')) {
      action = 'search';
    }

    // Extract email parameters
    const parameters: GmailIntent = { action: action as GmailIntent['action'] };
    
    // Extract email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = input.match(emailRegex) || [];
    if (emails.length > 0) {
      parameters.to = emails;
    }

    // Extract subject (look for patterns like "subject: " or "about ")
    const subjectMatch = input.match(/(?:subject|about)[:\s]+([^.!?]*)/i);
    if (subjectMatch) {
      parameters.subject = subjectMatch[1].trim();
    }

    // Extract body (everything after email address or subject)
    if (emails.length > 0 && emails[0]) {
      const afterEmail = input.split(emails[0])[1];
      if (afterEmail) {
        parameters.body = afterEmail.replace(/^[:\s,]+/, '').trim();
      }
    }

    return {
      agent: 'gmail',
      action,
      confidence: 0.8,
      parameters
    };
  }

  private parseCalculatorIntent(input: string): AgentIntent {
    // Extract mathematical expression
    const expression = input.replace(/what\s+is\s+/i, '').trim();
    
    // Determine operation type
    let operation: CalculatorIntent['operation'] = 'complex';
    if (input.includes('+') || /\badd\b|\bplus\b/.test(input)) operation = 'add';
    else if (input.includes('-') || /\bsubtract\b|\bminus\b/.test(input)) operation = 'subtract';
    else if (input.includes('*') || /\bmultiply\b|\btimes\b/.test(input)) operation = 'multiply';
    else if (input.includes('/') || /\bdivide\b/.test(input)) operation = 'divide';

    return {
      agent: 'calculator',
      action: 'calculate',
      confidence: 0.9,
      parameters: {
        expression,
        operation
      }
    };
  }

  private parseSheetsIntent(input: string): AgentIntent {
    const normalizedInput = input.toLowerCase();
    
    // Determine action
    let action = 'add_row';
    if (normalizedInput.includes('update') || normalizedInput.includes('edit')) {
      action = 'update_cell';
    } else if (normalizedInput.includes('read') || normalizedInput.includes('get')) {
      action = 'read_data';
    }

    const parameters: SheetsIntent = { action: action as SheetsIntent['action'] };

    // Extract sheet name
    const sheetMatch = input.match(/(?:sheet|spreadsheet)\s+(?:named\s+)?['""]?([^'""\s]+)['""]?/i);
    if (sheetMatch) {
      parameters.sheetName = sheetMatch[1];
    }

    // Extract data for adding rows
    if (action === 'add_row') {
      // Look for comma-separated values
      const dataMatch = input.match(/:\s*(.+)$/);
      if (dataMatch) {
        parameters.data = dataMatch[1].split(',').map(item => item.trim());
      }
    }

    return {
      agent: 'sheets',
      action,
      confidence: 0.7,
      parameters
    };
  }
}

export const agentParser = new AgentParser();
