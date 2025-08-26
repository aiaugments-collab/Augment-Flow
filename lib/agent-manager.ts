'use client';

import { agentParser, AgentIntent, GmailIntent, CalculatorIntent } from './agent-parser';
import { gmailAgent, AgentResponse } from './agents/gmail-agent';
import { calculatorAgent } from './agents/calculator-agent';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  agentType?: string;
  action?: string;
  loading?: boolean;
}

class AgentManager {
  async processUserMessage(userId: string, message: string): Promise<AgentResponse> {
    try {
      // Parse user intent
      const intent = await agentParser.parseUserInput(message);
      
      // Route to appropriate agent
      switch (intent.agent) {
        case 'gmail':
          return await gmailAgent.execute(userId, intent.parameters as GmailIntent, message);
        
        case 'calculator':
          return await calculatorAgent.execute(intent.parameters as CalculatorIntent);
        
        case 'sheets':
          // TODO: Implement sheets agent
          return {
            success: false,
            message: "📋 Google Sheets agent is coming soon! For now, you can use Gmail and Calculator agents."
          };
        
        default:
          return this.handleUnknownIntent(message);
      }
    } catch (error) {
      console.error('Agent manager error:', error);
      return {
        success: false,
        message: "I'm sorry, I encountered an error while processing your request. Please try again."
      };
    }
  }

  private handleUnknownIntent(message: string): AgentResponse {
    // Provide helpful suggestions based on available agents
    const suggestions = [
      "📧 **Gmail**: Send emails, create drafts, or summarize your inbox",
      "🧮 **Calculator**: Perform mathematical calculations",
      "📋 **Sheets**: (Coming soon) Add rows and update spreadsheets"
    ];

    const response = `I'm not sure how to help with that request. Here's what I can do:

${suggestions.join('\n')}

**Examples:**
• "Send an email to john@example.com about the meeting"
• "Calculate 25 * 4 + 10"
• "Summarize my recent emails"
• "Create a draft to team@company.com: Project update"

Try rephrasing your request using one of these examples!`;

    return {
      success: false,
      message: response
    };
  }

  // Helper method to convert agent response to chat message
  createChatMessage(response: AgentResponse): ChatMessage {
    return {
      id: Date.now().toString(),
      text: response.message,
      sender: 'ai',
      timestamp: Date.now(),
      agentType: response.action ? this.getAgentTypeFromAction(response.action) : undefined,
      action: response.action
    };
  }

  private getAgentTypeFromAction(action: string): string {
    if (action.includes('email') || action.includes('draft') || action.includes('gmail')) {
      return 'gmail';
    }
    if (action.includes('calculation') || action.includes('calculate')) {
      return 'calculator';
    }
    if (action.includes('sheet') || action.includes('row') || action.includes('cell')) {
      return 'sheets';
    }
    return 'unknown';
  }

  // Get loading message for agent
  getLoadingMessage(agentType: string): string {
    switch (agentType) {
      case 'gmail':
        return '📧 Processing your email request...';
      case 'calculator':
        return '🧮 Calculating...';
      case 'sheets':
        return '📋 Working on your spreadsheet...';
      default:
        return '🤔 Thinking...';
    }
  }

  // Check if message requires connection setup
  requiresConnection(intent: AgentIntent): { required: boolean; service?: string; action?: string } {
    if (intent.agent === 'gmail') {
      return {
        required: true,
        service: 'gmail',
        action: 'connect_gmail'
      };
    }
    if (intent.agent === 'sheets') {
      return {
        required: true,
        service: 'sheets',
        action: 'connect_sheets'
      };
    }
    return { required: false };
  }
}

export const agentManager = new AgentManager();
