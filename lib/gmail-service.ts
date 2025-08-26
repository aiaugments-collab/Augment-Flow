'use client';

import { UserConnection } from './connections';
import { logger } from './logger';

export interface GmailEmail {
  id: string;
  subject: string;
  from: string;
  to: string[];
  body: string;
  snippet: string;
  date: string;
  unread: boolean;
}

export interface SendEmailRequest {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isHtml?: boolean;
}

export interface EmailSummary {
  totalEmails: number;
  unreadCount: number;
  recentEmails: {
    subject: string;
    from: string;
    snippet: string;
    date: string;
  }[];
}

class GmailService {
  private baseUrl = 'https://gmail.googleapis.com/gmail/v1';

  // Get authorization headers
  private getHeaders(accessToken: string) {
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  // Send email
  async sendEmail(connection: UserConnection, emailData: SendEmailRequest): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      logger.info('Sending email via Gmail API', { 
        to: emailData.to, 
        subject: emailData.subject,
        hasAccessToken: !!connection.accessToken,
        tokenPrefix: connection.accessToken.substring(0, 10) + '...'
      });
      const email = this.createEmailMessage(emailData);
      const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      logger.debug('Gmail API request prepared', { 
        url: `${this.baseUrl}/users/me/messages/send`,
        emailLength: email.length,
        encodedLength: encodedEmail.length
      });

      const response = await fetch(`${this.baseUrl}/users/me/messages/send`, {
        method: 'POST',
        headers: this.getHeaders(connection.accessToken),
        body: JSON.stringify({
          raw: encodedEmail
        })
      });

      logger.debug('Gmail API response received', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Gmail API error response', { 
          status: response.status, 
          error,
          headers: Object.fromEntries(response.headers.entries())
        });
        throw new Error(`Failed to send email: ${error}`);
      }

      const result = await response.json();
      logger.info('Email sent successfully', { messageId: result.id });
      return { success: true, messageId: result.id };
    } catch (error) {
      logger.error('Error sending email', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Create draft email
  async createDraft(connection: UserConnection, emailData: SendEmailRequest): Promise<{ success: boolean; draftId?: string; error?: string }> {
    try {
      const email = this.createEmailMessage(emailData);
      const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const response = await fetch(`${this.baseUrl}/users/me/drafts`, {
        method: 'POST',
        headers: this.getHeaders(connection.accessToken),
        body: JSON.stringify({
          message: {
            raw: encodedEmail
          }
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create draft: ${error}`);
      }

      const result = await response.json();
      return { success: true, draftId: result.id };
    } catch (error) {
      console.error('Error creating draft:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Get recent emails
  async getRecentEmails(connection: UserConnection, maxResults: number = 10): Promise<GmailEmail[]> {
    try {
      // Get message IDs
      const listResponse = await fetch(`${this.baseUrl}/users/me/messages?maxResults=${maxResults}`, {
        headers: this.getHeaders(connection.accessToken)
      });

      if (!listResponse.ok) {
        throw new Error('Failed to fetch email list');
      }

      const listData = await listResponse.json();
      const messages = listData.messages || [];

      // Get full message details
      const emails: GmailEmail[] = [];
      for (const message of messages) {
        try {
          const messageResponse = await fetch(`${this.baseUrl}/users/me/messages/${message.id}`, {
            headers: this.getHeaders(connection.accessToken)
          });

          if (messageResponse.ok) {
            const messageData = await messageResponse.json();
            const email = this.parseEmailMessage(messageData);
            if (email) {
              emails.push(email);
            }
          }
        } catch (error) {
          console.error(`Error fetching message ${message.id}:`, error);
        }
      }

      return emails;
    } catch (error) {
      console.error('Error getting recent emails:', error);
      return [];
    }
  }

  // Get email summary
  async getEmailSummary(connection: UserConnection): Promise<EmailSummary> {
    try {
      const emails = await this.getRecentEmails(connection, 20);
      const unreadCount = emails.filter(email => email.unread).length;

      return {
        totalEmails: emails.length,
        unreadCount,
        recentEmails: emails.slice(0, 5).map(email => ({
          subject: email.subject,
          from: email.from,
          snippet: email.snippet,
          date: email.date
        }))
      };
    } catch (error) {
      console.error('Error getting email summary:', error);
      return {
        totalEmails: 0,
        unreadCount: 0,
        recentEmails: []
      };
    }
  }

  // Create email message string
  private createEmailMessage(emailData: SendEmailRequest): string {
    const { to, cc, bcc, subject, body, isHtml = false } = emailData;

    let email = '';
    email += `To: ${to.join(', ')}\r\n`;
    if (cc && cc.length > 0) {
      email += `Cc: ${cc.join(', ')}\r\n`;
    }
    if (bcc && bcc.length > 0) {
      email += `Bcc: ${bcc.join(', ')}\r\n`;
    }
    email += `Subject: ${subject}\r\n`;
    if (isHtml) {
      email += `Content-Type: text/html; charset=utf-8\r\n`;
    } else {
      email += `Content-Type: text/plain; charset=utf-8\r\n`;
    }
    email += `\r\n${body}`;

    return email;
  }

  // Search emails using Gmail query syntax
  async searchEmails(connection: UserConnection, searchRequest: { query: string; maxResults?: number }): Promise<{ success: boolean; emails?: GmailEmail[]; error?: string }> {
    try {
      logger.info('Searching emails via Gmail API', { 
        query: searchRequest.query,
        maxResults: searchRequest.maxResults || 10,
        hasAccessToken: !!connection.accessToken
      });

      const maxResults = Math.min(searchRequest.maxResults || 10, 50); // Limit to 50 max
      const response = await fetch(
        `${this.baseUrl}/users/me/messages?q=${encodeURIComponent(searchRequest.query)}&maxResults=${maxResults}`,
        {
          headers: this.getHeaders(connection.accessToken)
        }
      );

      logger.debug('Gmail search API response received', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Gmail search API error response', { 
          status: response.status, 
          error,
          query: searchRequest.query
        });
        throw new Error(`Failed to search emails: ${error}`);
      }

      const result = await response.json();
      const messageIds = result.messages || [];

      logger.debug('Search results received', { 
        messageCount: messageIds.length,
        query: searchRequest.query
      });

      // Get detailed information for each message
      const emails: GmailEmail[] = [];
      for (const message of messageIds) {
        try {
          const detailResponse = await fetch(
            `${this.baseUrl}/users/me/messages/${message.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
            {
              headers: this.getHeaders(connection.accessToken)
            }
          );

          if (detailResponse.ok) {
            const messageDetail = await detailResponse.json();
            const parsedEmail = this.parseEmailMessage(messageDetail);
            if (parsedEmail) {
              emails.push(parsedEmail);
            }
          }
        } catch (error) {
          logger.warn(`Failed to get details for message ${message.id}`, error);
          // Continue with other messages
        }
      }

      logger.info('Email search completed successfully', { 
        query: searchRequest.query,
        totalFound: messageIds.length,
        detailsRetrieved: emails.length
      });

      return { 
        success: true, 
        emails 
      };

    } catch (error) {
      logger.error('Error searching emails', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Parse Gmail API message response
  private parseEmailMessage(messageData: unknown): GmailEmail | null {
    try {
      const data = messageData as { 
        id: string; 
        snippet: string; 
        labelIds?: string[];
        payload: { 
          headers: { name: string; value: string }[];
          parts?: { mimeType: string; body: { data?: string } }[];
          body?: { data?: string };
        }
      };
      
      const payload = data.payload;
      const headers = payload.headers;

      const getHeader = (name: string) => {
        const header = headers.find((h: { name: string; value: string }) => h.name.toLowerCase() === name.toLowerCase());
        return header ? header.value : '';
      };

      const subject = getHeader('subject');
      const from = getHeader('from');
      const to = getHeader('to');
      const date = getHeader('date');

      // Get body
      let body = '';
      if (payload.parts) {
        for (const part of payload.parts) {
          if (part.mimeType === 'text/plain' && part.body.data) {
            body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
            break;
          }
        }
      } else if (payload.body && payload.body.data) {
        body = atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }

      // Check if unread
      const unread = data.labelIds?.includes('UNREAD') || false;

      return {
        id: data.id,
        subject,
        from,
        to: to.split(',').map((email: string) => email.trim()),
        body,
        snippet: data.snippet || '',
        date,
        unread
      };
    } catch (error) {
      console.error('Error parsing email message:', error);
      return null;
    }
  }
}

export const gmailService = new GmailService();
