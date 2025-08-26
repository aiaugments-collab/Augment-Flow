'use client';

interface ActivityItem {
  id: string;
  type: 'user_signup' | 'agent_execution' | 'subscription' | 'error';
  message: string;
  timestamp: string;
  details?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'user_signup',
    message: 'New user registration',
    timestamp: '2 minutes ago',
    details: 'sarah.johnson@email.com'
  },
  {
    id: '2',
    type: 'agent_execution',
    message: 'Gmail Agent executed',
    timestamp: '5 minutes ago',
    details: 'Email sent successfully'
  },
  {
    id: '3',
    type: 'subscription',
    message: 'User upgraded to Pro',
    timestamp: '12 minutes ago',
    details: 'mike.chen@company.com'
  },
  {
    id: '4',
    type: 'agent_execution',
    message: 'Sheets Agent executed',
    timestamp: '18 minutes ago',
    details: 'Row added to spreadsheet'
  },
  {
    id: '5',
    type: 'user_signup',
    message: 'New user registration',
    timestamp: '23 minutes ago',
    details: 'alex.rivera@startup.io'
  },
  {
    id: '6',
    type: 'error',
    message: 'Agent execution failed',
    timestamp: '31 minutes ago',
    details: 'Gmail OAuth token expired'
  },
  {
    id: '7',
    type: 'agent_execution',
    message: 'Calculator Agent executed',
    timestamp: '35 minutes ago',
    details: 'Mathematical calculation completed'
  }
];

export default function RecentActivity() {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'user_signup':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="m22 21-2-2"></path>
              <path d="m19 21-2-2"></path>
              <circle cx="19" cy="16" r="3"></circle>
            </svg>
          </div>
        );
      case 'agent_execution':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="8" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </div>
        );
      case 'subscription':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" x2="9" y1="9" y2="15"></line>
              <line x1="9" x2="15" y1="9" y2="15"></line>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80">View All</button>
      </div>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            {getActivityIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              {activity.details && (
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
