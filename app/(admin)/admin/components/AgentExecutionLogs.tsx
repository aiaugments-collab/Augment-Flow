'use client';

interface ExecutionLog {
  id: string;
  agent: 'Gmail' | 'Sheets' | 'Calculator';
  user: string;
  prompt: string;
  status: 'success' | 'failed' | 'pending';
  responseTime: number;
  timestamp: string;
  result?: string;
  error?: string;
}

const mockExecutionLogs: ExecutionLog[] = [
  {
    id: '1',
    agent: 'Gmail',
    user: 'sarah.johnson@email.com',
    prompt: 'Send email to team about project update',
    status: 'success',
    responseTime: 1.2,
    timestamp: '2 minutes ago',
    result: 'Email sent successfully to 5 recipients'
  },
  {
    id: '2',
    agent: 'Sheets',
    user: 'mike.chen@company.com',
    prompt: 'Add expense: Lunch $25',
    status: 'success',
    responseTime: 0.8,
    timestamp: '5 minutes ago',
    result: 'Row added to Expenses sheet'
  },
  {
    id: '3',
    agent: 'Calculator',
    user: 'alex.rivera@startup.io',
    prompt: 'Calculate 15% of 2500',
    status: 'success',
    responseTime: 0.1,
    timestamp: '8 minutes ago',
    result: '375'
  },
  {
    id: '4',
    agent: 'Gmail',
    user: 'emma.davis@freelance.com',
    prompt: 'Send invoice reminder',
    status: 'failed',
    responseTime: 2.1,
    timestamp: '12 minutes ago',
    error: 'OAuth token expired'
  },
  {
    id: '5',
    agent: 'Sheets',
    user: 'james.wilson@agency.co',
    prompt: 'Update client data in CRM sheet',
    status: 'success',
    responseTime: 1.5,
    timestamp: '15 minutes ago',
    result: 'Updated 3 rows in CRM sheet'
  },
  {
    id: '6',
    agent: 'Calculator',
    user: 'lisa.anderson@corp.com',
    prompt: 'What is 12 * 45 + 67?',
    status: 'success',
    responseTime: 0.2,
    timestamp: '18 minutes ago',
    result: '607'
  },
  {
    id: '7',
    agent: 'Gmail',
    user: 'david.kim@tech.io',
    prompt: 'Forward meeting notes to stakeholders',
    status: 'pending',
    responseTime: 0,
    timestamp: '20 minutes ago'
  },
  {
    id: '8',
    agent: 'Sheets',
    user: 'sophie.brown@design.studio',
    prompt: 'Add project milestone to timeline',
    status: 'success',
    responseTime: 1.1,
    timestamp: '22 minutes ago',
    result: 'Milestone added to Project Timeline'
  }
];

export default function AgentExecutionLogs() {
  const getStatusBadge = (status: ExecutionLog['status']) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Success
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Failed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </span>
        );
    }
  };

  const getAgentIcon = (agent: ExecutionLog['agent']) => {
    switch (agent) {
      case 'Gmail':
        return (
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-10 5L2 7"></path>
            </svg>
          </div>
        );
      case 'Sheets':
        return (
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" x2="8" y1="13" y2="13"></line>
              <line x1="16" x2="8" y1="17" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
        );
      case 'Calculator':
        return (
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
              <rect width="16" height="20" x="4" y="2" rx="2"></rect>
              <line x1="8" x2="16" y1="6" y2="6"></line>
              <line x1="16" x2="16" y1="14" y2="18"></line>
              <path d="M16 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M8 18h.01"></path>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Execution Logs</h3>
        <div className="flex items-center gap-3">
          <button className="text-sm text-muted-foreground hover:text-foreground">
            Filter
          </button>
          <button className="text-sm text-primary hover:text-primary/80">View All</button>
        </div>
      </div>

      <div className="space-y-4">
        {mockExecutionLogs.map((log) => (
          <div key={log.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getAgentIcon(log.agent)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground">{log.agent} Agent</span>
                    {getStatusBadge(log.status)}
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">User: {log.user}</p>
                  <p className="text-sm text-foreground font-medium mb-2">&ldquo;{log.prompt}&rdquo;</p>
                  
                  {log.status === 'success' && log.result && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-2">
                      <p className="text-sm text-green-800 dark:text-green-400">✓ {log.result}</p>
                    </div>
                  )}
                  
                  {log.status === 'failed' && log.error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-2">
                      <p className="text-sm text-red-800 dark:text-red-400">✗ {log.error}</p>
                    </div>
                  )}
                  
                  {log.status === 'pending' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-2">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">⏳ Processing...</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right ml-4">
                {log.status !== 'pending' && (
                  <div className="text-xs text-muted-foreground">
                    Response: {log.responseTime}s
                  </div>
                )}
                <button className="text-xs text-primary hover:text-primary/80 mt-1">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted/50 transition-colors">
          Load More Logs
        </button>
      </div>
    </div>
  );
}
