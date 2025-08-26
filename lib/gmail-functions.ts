'use client';

import { UserConnection } from './connections';

// Gmail function definitions for the AI agent
export interface GmailFunctionDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

export const GMAIL_FUNCTIONS: GmailFunctionDefinition[] = [
  {
    name: "sendEmail",
    description: "Send an email to one or more recipients",
    parameters: {
      type: "object",
      properties: {
        to: {
          type: "array",
          items: { type: "string" },
          description: "Email addresses of recipients"
        },
        subject: {
          type: "string",
          description: "Email subject line"
        },
        body: {
          type: "string",
          description: "Email body content"
        },
        cc: {
          type: "array",
          items: { type: "string" },
          description: "CC email addresses (optional)"
        }
      },
      required: ["to", "subject", "body"]
    }
  },
  {
    name: "searchEmails",
    description: "Search for emails using Gmail search query syntax",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Gmail search query (e.g., 'from:john subject:meeting', 'is:unread', 'newer_than:7d')"
        },
        maxResults: {
          type: "number",
          description: "Maximum number of emails to return (default: 10)"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "getEmails",
    description: "Get emails from a specific folder or label",
    parameters: {
      type: "object",
      properties: {
        folder: {
          type: "string",
          description: "Gmail label/folder (INBOX, SENT, DRAFT, SPAM, TRASH)",
          enum: ["INBOX", "SENT", "DRAFT", "SPAM", "TRASH"]
        },
        unreadOnly: {
          type: "boolean",
          description: "Only return unread emails (default: false)"
        },
        maxResults: {
          type: "number",
          description: "Maximum number of emails to return (default: 10)"
        }
      },
      required: ["folder"]
    }
  },
  {
    name: "draftEmail",
    description: "Create a draft email without sending it",
    parameters: {
      type: "object",
      properties: {
        to: {
          type: "array",
          items: { type: "string" },
          description: "Email addresses of recipients"
        },
        subject: {
          type: "string",
          description: "Email subject line"
        },
        body: {
          type: "string",
          description: "Email body content"
        },
        cc: {
          type: "array",
          items: { type: "string" },
          description: "CC email addresses (optional)"
        }
      },
      required: ["to", "subject", "body"]
    }
  },
  {
    name: "getEmailDetails",
    description: "Get full details of a specific email by its ID",
    parameters: {
      type: "object",
      properties: {
        messageId: {
          type: "string",
          description: "Gmail message ID"
        }
      },
      required: ["messageId"]
    }
  },
  {
    name: "markAsRead",
    description: "Mark one or more emails as read",
    parameters: {
      type: "object",
      properties: {
        messageIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of Gmail message IDs to mark as read"
        }
      },
      required: ["messageIds"]
    }
  },
  {
    name: "markAsUnread",
    description: "Mark one or more emails as unread",
    parameters: {
      type: "object",
      properties: {
        messageIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of Gmail message IDs to mark as unread"
        }
      },
      required: ["messageIds"]
    }
  },
  {
    name: "deleteEmails",
    description: "Delete one or more emails permanently",
    parameters: {
      type: "object",
      properties: {
        messageIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of Gmail message IDs to delete"
        }
      },
      required: ["messageIds"]
    }
  },
  {
    name: "summarizeEmails",
    description: "Get an AI summary of multiple emails",
    parameters: {
      type: "object",
      properties: {
        messageIds: {
          type: "array",
          items: { type: "string" },
          description: "Array of Gmail message IDs to summarize"
        },
        summaryType: {
          type: "string",
          description: "Type of summary to generate",
          enum: ["brief", "detailed", "action_items", "key_points"]
        }
      },
      required: ["messageIds"]
    }
  }
];

// Function call result interface
export interface FunctionCallResult {
  success: boolean;
  data?: any;
  error?: string;
  functionName: string;
}

// Function call request interface
export interface FunctionCall {
  name: string;
  arguments: Record<string, any>;
}

// Agent response with function calls
export interface AgentFunctionResponse {
  message?: string;
  function_calls?: FunctionCall[];
  completed: boolean;
}
