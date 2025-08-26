'use client';

import { UserConnection } from './connections';
import { gmailService } from './gmail-service';
import { FunctionCall, FunctionCallResult } from './gmail-functions';
import { logger } from './logger';
import { geminiService } from './gemini-service';

export class GmailFunctionExecutor {
  
  async executeFunction(
    connection: UserConnection, 
    functionCall: FunctionCall
  ): Promise<FunctionCallResult> {
    try {
      logger.info(`🔧 Executing Gmail function: ${functionCall.name}`, {
        function: functionCall.name,
        arguments: functionCall.arguments
      });

      switch (functionCall.name) {
        case 'sendEmail':
          return await this.sendEmail(connection, functionCall.arguments);
          
        case 'searchEmails':
          return await this.searchEmails(connection, functionCall.arguments);
          
        case 'getEmails':
          return await this.getEmails(connection, functionCall.arguments);
          
        case 'draftEmail':
          return await this.draftEmail(connection, functionCall.arguments);
          
        case 'getEmailDetails':
          return await this.getEmailDetails(connection, functionCall.arguments);
          
        case 'markAsRead':
          return await this.markAsRead(connection, functionCall.arguments);
          
        case 'markAsUnread':
          return await this.markAsUnread(connection, functionCall.arguments);
          
        case 'deleteEmails':
          return await this.deleteEmails(connection, functionCall.arguments);
          
        case 'summarizeEmails':
          return await this.summarizeEmails(connection, functionCall.arguments);
          
        default:
          return {
            success: false,
            error: `Unknown function: ${functionCall.name}`,
            functionName: functionCall.name
          };
      }
    } catch (error) {
      logger.error(`❌ Error executing function ${functionCall.name}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: functionCall.name
      };
    }
  }

  private async sendEmail(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    const result = await gmailService.sendEmail(connection, {
      to: args.to,
      subject: args.subject,
      body: args.body,
      cc: args.cc
    });

    return {
      success: result.success,
      data: result.messageId ? { messageId: result.messageId } : undefined,
      error: result.error,
      functionName: 'sendEmail'
    };
  }

  private async searchEmails(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    const result = await gmailService.searchEmails(connection, {
      query: args.query,
      maxResults: args.maxResults || 10
    });

    return {
      success: result.success,
      data: result.emails,
      error: result.error,
      functionName: 'searchEmails'
    };
  }

  private async getEmails(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    // Convert folder to appropriate query
    let query = `in:${args.folder.toLowerCase()}`;
    if (args.unreadOnly) {
      query += ' is:unread';
    }

    const result = await gmailService.searchEmails(connection, {
      query: query,
      maxResults: args.maxResults || 10
    });

    return {
      success: result.success,
      data: result.emails,
      error: result.error,
      functionName: 'getEmails'
    };
  }

  private async draftEmail(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    const result = await gmailService.createDraft(connection, {
      to: args.to,
      subject: args.subject,
      body: args.body,
      cc: args.cc
    });

    return {
      success: result.success,
      data: result.draftId ? { draftId: result.draftId } : undefined,
      error: result.error,
      functionName: 'draftEmail'
    };
  }

  private async getEmailDetails(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    // This would require a new method in gmail-service to get specific email details
    // For now, let's implement a basic version
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${args.messageId}?format=full`,
        {
          headers: {
            'Authorization': `Bearer ${connection.accessToken}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get email details: ${response.statusText}`);
      }

      const email = await response.json();
      
      // Parse the email data
      const headers = email.payload?.headers || [];
      const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
      const from = headers.find((h: any) => h.name === 'From')?.value || '';
      const to = headers.find((h: any) => h.name === 'To')?.value || '';
      const date = headers.find((h: any) => h.name === 'Date')?.value || '';

      // Get body content (simplified)
      let body = '';
      if (email.payload?.body?.data) {
        body = atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      } else if (email.payload?.parts) {
        // Handle multipart emails (simplified)
        const textPart = email.payload.parts.find((part: any) => part.mimeType === 'text/plain');
        if (textPart?.body?.data) {
          body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      }

      return {
        success: true,
        data: {
          messageId: args.messageId,
          subject,
          from,
          to,
          date,
          body: body.substring(0, 1000), // Truncate for safety
          snippet: email.snippet
        },
        functionName: 'getEmailDetails'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: 'getEmailDetails'
      };
    }
  }

  private async markAsRead(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    try {
      for (const messageId of args.messageIds) {
        const response = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${connection.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              removeLabelIds: ['UNREAD']
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to mark email as read: ${response.statusText}`);
        }
      }

      return {
        success: true,
        data: { markedAsRead: args.messageIds.length },
        functionName: 'markAsRead'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: 'markAsRead'
      };
    }
  }

  private async markAsUnread(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    try {
      for (const messageId of args.messageIds) {
        const response = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${connection.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              addLabelIds: ['UNREAD']
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to mark email as unread: ${response.statusText}`);
        }
      }

      return {
        success: true,
        data: { markedAsUnread: args.messageIds.length },
        functionName: 'markAsUnread'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: 'markAsUnread'
      };
    }
  }

  private async deleteEmails(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    try {
      for (const messageId of args.messageIds) {
        const response = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${connection.accessToken}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete email: ${response.statusText}`);
        }
      }

      return {
        success: true,
        data: { deleted: args.messageIds.length },
        functionName: 'deleteEmails'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: 'deleteEmails'
      };
    }
  }

  private async summarizeEmails(connection: UserConnection, args: any): Promise<FunctionCallResult> {
    try {
      // Get details for each email
      const emailDetails = [];
      for (const messageId of args.messageIds) {
        const detailResult = await this.getEmailDetails(connection, { messageId });
        if (detailResult.success) {
          emailDetails.push(detailResult.data);
        }
      }

      if (emailDetails.length === 0) {
        return {
          success: false,
          error: 'No email details could be retrieved',
          functionName: 'summarizeEmails'
        };
      }

      // Generate summary using Gemini
      const summaryRequest = {
        userRequest: `Summarize these emails in ${args.summaryType || 'brief'} format:\n\n${
          emailDetails.map(email => 
            `From: ${email.from}\nSubject: ${email.subject}\nDate: ${email.date}\nContent: ${email.body}\n---\n`
          ).join('')
        }`,
        context: `Email summary (${args.summaryType || 'brief'} format)`
      };

      const summary = await geminiService.generateEmailSummary(summaryRequest);

      return {
        success: true,
        data: {
          summary,
          emailCount: emailDetails.length,
          summaryType: args.summaryType || 'brief'
        },
        functionName: 'summarizeEmails'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        functionName: 'summarizeEmails'
      };
    }
  }
}

export const gmailFunctionExecutor = new GmailFunctionExecutor();
