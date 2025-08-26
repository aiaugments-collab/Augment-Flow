'use client';

interface AgentData {
  name: string;
  executions: number;
  successRate: number;
  avgResponseTime: number;
  status: 'active' | 'maintenance' | 'error';
  icon: React.ReactNode;
}

const agentData: AgentData[] = [
  {
    name: 'Gmail Agent',
    executions: 8743,
    successRate: 99.2,
    avgResponseTime: 1.1,
    status: 'active',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-10 5L2 7"></path>
      </svg>
    )
  },
  {
    name: 'Google Sheets Agent',
    executions: 5124,
    successRate: 97.8,
    avgResponseTime: 1.4,
    status: 'active',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
        <line x1="16" x2="8" y1="13" y2="13"></line>
        <line x1="16" x2="8" y1="17" y2="17"></line>
        <polyline points="10,9 9,9 8,9"></polyline>
      </svg>
    )
  },
  {
    name: 'Calculator Agent',
    executions: 1565,
    successRate: 99.9,
    avgResponseTime: 0.3,
    status: 'active',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    )
  }
];

export default function AgentsPerformance() {
  const getStatusBadge = (status: AgentData['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Maintenance
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Error
          </span>
        );
    }
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 98) return 'text-green-600 dark:text-green-400';
    if (rate >= 95) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Agent Performance</h3>
        <button className="text-sm text-primary hover:text-primary/80">View Details</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agentData.map((agent, index) => (
          <div key={index} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  {agent.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{agent.name}</h4>
                  {getStatusBadge(agent.status)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Executions */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Executions</span>
                <span className="font-medium text-foreground">{agent.executions.toLocaleString()}</span>
              </div>

              {/* Success Rate */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className={`font-medium ${getPerformanceColor(agent.successRate)}`}>
                  {agent.successRate}%
                </span>
              </div>

              {/* Response Time */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Response</span>
                <span className="font-medium text-foreground">{agent.avgResponseTime}s</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Performance</span>
                  <span className="text-xs text-muted-foreground">{agent.successRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      agent.successRate >= 98 ? 'bg-green-500' : 
                      agent.successRate >= 95 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${agent.successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Most Used Agent</p>
            <p className="text-lg font-semibold text-foreground">Gmail Agent</p>
            <p className="text-xs text-muted-foreground">8,743 executions</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Best Performance</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">Calculator Agent</p>
            <p className="text-xs text-muted-foreground">99.9% success rate</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Fastest Response</p>
            <p className="text-lg font-semibold text-primary">Calculator Agent</p>
            <p className="text-xs text-muted-foreground">0.3s average</p>
          </div>
        </div>
      </div>
    </div>
  );
}
