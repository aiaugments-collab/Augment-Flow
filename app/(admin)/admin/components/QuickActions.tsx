'use client';

import Link from 'next/link';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    title: 'Manage Users',
    description: 'View and manage user accounts',
    href: '/admin/users',
    color: 'blue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="m22 21-2-2"></path>
        <path d="m19 21-2-2"></path>
        <circle cx="19" cy="16" r="3"></circle>
      </svg>
    )
  },
  {
    title: 'View Subscriptions',
    description: 'Monitor billing and plans',
    href: '/admin/subscriptions',
    color: 'purple',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
      </svg>
    )
  },
  {
    title: 'Agent Analytics',
    description: 'Check agent performance',
    href: '/admin/agents',
    color: 'green',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"></path>
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>
    )
  },
  {
    title: 'System Health',
    description: 'Monitor platform status',
    href: '/admin',
    color: 'orange',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

export default function QuickActions() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/40';
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`block p-4 rounded-lg border border-border transition-all hover:scale-[1.02] ${getColorClasses(action.color)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-80">{action.description}</p>
              </div>
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
