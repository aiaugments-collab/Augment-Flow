'use client';

import { gmailService, SendEmailRequest } from '../gmail-service';
import { getGmailConnection, UserConnection } from '../connections';
import { GmailIntent } from '../agent-parser';
import { geminiService } from '../gemini-service';
import { gmailFunctionExecutor } from '../gmail-function-executor';
import { AgentFunctionResponse, FunctionCallResult } from '../gmail-functions';
import { logger } from '../logger';

export interface AgentResponse {
  success: boolean;
  message: string;
  data?: unknown;
  action?: string;
}

class GmailAgent {
  async execute(userId: string, intent: GmailIntent, originalUserRequest?: string): Promise<AgentResponse> {
    try {
      logger.info('🤖 Gmail agent executing with agentic workflow', { 
        userId, 
        action: intent.action, 
        userRequest: originalUserRequest?.substring(0, 100) + '...'
      });

      // Check if user has Gmail connected
      const connection = await getGmailConnection(userId);
      if (!connection) {
        logger.warn('Gmail not connected for user', { userId });
        return {
          success: false,
          message: "Gmail not connected. Please connect your Gmail account in Apps first.",
          action: 'connect_gmail'
        };
      }

      logger.debug('Gmail connection found', { 
        connectionId: connection.id, 
        email: connection.email,
        hasAccessToken: !!connection.accessToken
      });

      // Use the new agentic workflow instead of hardcoded actions
      return await this.executeAgenticWorkflow(connection, originalUserRequest || 'Execute Gmail action');
    } catch (error) {
      logger.error('Gmail agent error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }

  private async executeAgenticWorkflow(connection: UserConnection, userRequest: string): Promise<AgentResponse> {
    try {
      logger.info('🧠 Starting agentic Gmail workflow', { userRequest });

      // Step 1: Analyze request and decide functions
      const functionDecision = await geminiService.decideGmailFunctions(userRequest, 'Gmail agent execution');

      logger.debug('🎯 Function decision received', {
        hasFunctionCalls: !!(functionDecision.function_calls && functionDecision.function_calls.length > 0),
        functionCount: functionDecision.function_calls?.length || 0,
        message: functionDecision.message,
        completed: functionDecision.completed
      });

      let finalResponse = functionDecision.message || '';
      const allResults: FunctionCallResult[] = [];

      // Step 2: Execute functions
      if (functionDecision.function_calls && functionDecision.function_calls.length > 0) {
        for (const functionCall of functionDecision.function_calls) {
          logger.debug(`🔧 Executing function: ${functionCall.name}`, functionCall.arguments);
          
          const result = await gmailFunctionExecutor.executeFunction(connection, functionCall);
          allResults.push(result);

          if (!result.success) {
            // Check if it's a reconnection error
            if (result.error?.includes('RECONNECT_REQUIRED')) {
              return {
                success: false,
                message: `🔄 Your Gmail connection has expired. Please go to Apps and reconnect your Gmail account for continued access.`,
                action: 'reconnect_required'
              };
            }
            
            return {
              success: false,
              message: `❌ Error executing ${functionCall.name}: ${result.error}`,
              action: 'function_error'
            };
          }
        }

        // Step 3: Generate final response
        finalResponse = await this.generateFinalResponse(userRequest, allResults, finalResponse);
      }

      return {
        success: true,
        message: finalResponse,
        action: 'agentic_completed',
        data: { 
          functionResults: allResults,
          executedFunctions: allResults.map(r => r.functionName)
        }
      };

    } catch (error) {
      logger.error('❌ Error in agentic workflow', error);
      return {
        success: false,
        message: `❌ An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        action: 'workflow_error'
      };
    }
  }

  private async generateFinalResponse(userRequest: string, results: FunctionCallResult[], currentMessage: string): Promise<string> {
    const successfulResults = results.filter(r => r.success);
    
    if (successfulResults.length === 0) {
      return currentMessage || "I've processed your request.";
    }

    let response = currentMessage;

    for (const result of successfulResults) {
      switch (result.functionName) {
        case 'sendEmail':
          response += `\n\n✅ **Email sent successfully!**`;
          if (result.data?.messageId) {
            response += `\n📧 Message ID: ${result.data.messageId}`;
          }
          break;

        case 'searchEmails':
        case 'getEmails':
          const emails = result.data as any[];
          if (emails && emails.length > 0) {
            response += `\n\n📧 **Found ${emails.length} email${emails.length > 1 ? 's' : ''}:**\n`;
            
            emails.forEach((email, index) => {
              response += `\n**${index + 1}.** ${email.subject || 'No Subject'}\n`;
              response += `   👤 From: ${email.from || 'Unknown'}\n`;
              response += `   📅 Date: ${email.date || 'Unknown'}\n`;
              if (email.snippet) {
                response += `   📝 Preview: ${email.snippet.substring(0, 100)}${email.snippet.length > 100 ? '...' : ''}\n`;
              }
              response += `   🆔 ID: ${email.id}\n`;
            });

            // Add helpful suggestions
            if (userRequest.toLowerCase().includes('unread')) {
              response += `\n💡 **What would you like to do?**\n`;
              response += `• Say "Mark all as read" to mark these emails as read\n`;
              response += `• Say "Open email 1" to see the full content of the first email\n`;
              response += `• Say "Reply to email 2" to reply to the second email\n`;
              response += `• Say "Summarize these emails" to get an AI summary`;
            }
          } else {
            response += `\n\n📭 **No emails found** matching your criteria.`;
            if (userRequest.toLowerCase().includes('unread')) {
              response += `\n🎉 Great! You have no unread emails in your inbox.`;
            }
          }
          break;

        case 'draftEmail':
          response += `\n\n📝 **Draft created successfully!**`;
          if (result.data?.draftId) {
            response += `\n📧 Draft ID: ${result.data.draftId}`;
            response += `\n💡 You can find it in your Gmail drafts folder.`;
          }
          break;

        case 'markAsRead':
          response += `\n\n✅ **Marked ${result.data?.markedAsRead || 0} email${(result.data?.markedAsRead || 0) > 1 ? 's' : ''} as read**`;
          break;

        case 'markAsUnread':
          response += `\n\n📩 **Marked ${result.data?.markedAsUnread || 0} email${(result.data?.markedAsUnread || 0) > 1 ? 's' : ''} as unread**`;
          break;

        case 'deleteEmails':
          response += `\n\n🗑️ **Deleted ${result.data?.deleted || 0} email${(result.data?.deleted || 0) > 1 ? 's' : ''}**`;
          break;

        case 'summarizeEmails':
          response += `\n\n📊 **Email Summary:**\n`;
          response += result.data?.summary || 'Summary not available';
          break;

        case 'getEmailDetails':
          const emailDetail = result.data;
          if (emailDetail) {
            response += `\n\n📧 **Email Details:**\n`;
            response += `**Subject:** ${emailDetail.subject || 'No Subject'}\n`;
            response += `**From:** ${emailDetail.from || 'Unknown'}\n`;
            response += `**To:** ${emailDetail.to || 'Unknown'}\n`;
            response += `**Date:** ${emailDetail.date || 'Unknown'}\n\n`;
            response += `**Content:**\n${emailDetail.body || emailDetail.snippet || 'No content available'}`;
          }
          break;

        default:
          response += `\n\n✅ ${result.functionName} completed successfully`;
      }
    }

    return response;
  }

  private async sendEmail(connection: UserConnection, intent: GmailIntent, originalUserRequest?: string): Promise<AgentResponse> {
    try {
      // Use AI to generate complete email from user request
      const generatedEmail = await geminiService.generateEmail({
        userRequest: originalUserRequest || `Send email to ${intent.to?.join(', ')} with subject "${intent.subject}" and body "${intent.body}"`,
        recipientEmail: intent.to?.[0],
        context: 'Sending email via Augment Flow'
      });

      const emailRequest: SendEmailRequest = {
        to: generatedEmail.to.filter(email => email), // Remove empty emails
        cc: generatedEmail.cc,
        bcc: generatedEmail.bcc,
        subject: generatedEmail.subject,
        body: generatedEmail.body,
        isHtml: false
      };

      const result = await gmailService.sendEmail(connection, emailRequest);

      if (result.success) {
        return {
          success: true,
          message: `✅ Email sent successfully to ${emailRequest.to.join(', ')}\n\n📧 Subject: ${emailRequest.subject}\n📝 Content: ${emailRequest.body.substring(0, 150)}...`,
          data: { messageId: result.messageId, generatedEmail },
          action: 'email_sent'
        };
      } else {
        return {
          success: false,
          message: `Failed to send email: ${result.error}`
        };
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email due to an unexpected error'
      };
    }
  }

  private async createDraft(connection: UserConnection, intent: GmailIntent, originalUserRequest?: string): Promise<AgentResponse> {
    try {
      // Use AI to generate complete draft from user request
      const generatedEmail = await geminiService.generateEmail({
        userRequest: originalUserRequest || `Create draft email to ${intent.to?.join(', ')} with subject "${intent.subject}" and body "${intent.body}"`,
        recipientEmail: intent.to?.[0],
        context: 'Creating draft via Augment Flow'
      });

      const emailRequest: SendEmailRequest = {
        to: generatedEmail.to.filter(email => email),
        cc: generatedEmail.cc,
        bcc: generatedEmail.bcc,
        subject: generatedEmail.subject,
        body: generatedEmail.body,
        isHtml: false
      };

      const result = await gmailService.createDraft(connection, emailRequest);

      if (result.success) {
        return {
          success: true,
          message: `📝 Draft created successfully for ${emailRequest.to.join(', ')}\n\n📧 Subject: ${emailRequest.subject}\n📝 Content: ${emailRequest.body.substring(0, 150)}...`,
          data: { draftId: result.draftId, generatedEmail },
          action: 'draft_created'
        };
      } else {
        return {
          success: false,
          message: `Failed to create draft: ${result.error}`
        };
      }
    } catch (error) {
      console.error('Error creating draft:', error);
      return {
        success: false,
        message: 'Failed to create draft due to an unexpected error'
      };
    }
  }

  private async summarizeEmails(connection: UserConnection): Promise<AgentResponse> {
    try {
      const summary = await gmailService.getEmailSummary(connection);

      const summaryText = `📧 Email Summary:
• Total emails: ${summary.totalEmails}
• Unread emails: ${summary.unreadCount}

Recent emails:
${summary.recentEmails.map((email, index) => 
  `${index + 1}. From: ${email.from}
   Subject: ${email.subject}
   Preview: ${email.snippet.substring(0, 100)}...
   Date: ${email.date}`
).join('\n\n')}`;

      return {
        success: true,
        message: summaryText,
        data: summary,
        action: 'email_summarized'
      };
    } catch (error) {
      console.error('Error summarizing emails:', error);
      return {
        success: false,
        message: 'Failed to summarize emails due to an unexpected error'
      };
    }
  }

  private async searchEmails(connection: UserConnection, intent: GmailIntent): Promise<AgentResponse> {
    try {
      const emails = await gmailService.getRecentEmails(connection, 20);
      
      let filteredEmails = emails;
      if (intent.query) {
        const query = intent.query.toLowerCase();
        filteredEmails = emails.filter(email => 
          email.subject.toLowerCase().includes(query) ||
          email.from.toLowerCase().includes(query) ||
          email.body.toLowerCase().includes(query)
        );
      }

      if (filteredEmails.length === 0) {
        return {
          success: true,
          message: intent.query 
            ? `🔍 No emails found matching "${intent.query}"`
            : "📧 No emails found",
          data: { emails: [] }
        };
      }

      const searchResults = `🔍 Found ${filteredEmails.length} email(s)${intent.query ? ` matching "${intent.query}"` : ''}:

${filteredEmails.slice(0, 5).map((email, index) => 
  `${index + 1}. From: ${email.from}
   Subject: ${email.subject}
   Preview: ${email.snippet.substring(0, 100)}...
   Date: ${email.date}`
).join('\n\n')}

${filteredEmails.length > 5 ? `\n... and ${filteredEmails.length - 5} more emails` : ''}`;

      return {
        success: true,
        message: searchResults,
        data: { emails: filteredEmails },
        action: 'emails_searched'
      };
    } catch (error) {
      console.error('Error searching emails:', error);
      return {
        success: false,
        message: 'Failed to search emails due to an unexpected error'
      };
    }
  }
}

export const gmailAgent = new GmailAgent();
