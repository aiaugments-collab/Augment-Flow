'use client';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <div className={`flex items-center text-sm ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend === 'up' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="23,18 13.5,8.5 8.5,13.5 1,6"></polyline>
                  <polyline points="17,18 23,18 23,12"></polyline>
                </svg>
              )}
              {change}
            </div>
            <span className="text-xs text-muted-foreground ml-2">from last month</span>
          </div>
        </div>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}
