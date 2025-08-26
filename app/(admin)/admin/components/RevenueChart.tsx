'use client';

export default function RevenueChart() {
  // Mock revenue data for the chart
  const revenueData = [
    { month: 'Aug', revenue: 8420 },
    { month: 'Sep', revenue: 9150 },
    { month: 'Oct', revenue: 10200 },
    { month: 'Nov', revenue: 11500 },
    { month: 'Dec', revenue: 12100 },
    { month: 'Jan', revenue: 12847 }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
          <p className="text-sm text-muted-foreground">Monthly recurring revenue over time</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Revenue</span>
          </div>
        </div>
      </div>

      {/* Simple Chart */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {revenueData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer hover:bg-primary/30 transition-colors"
                style={{ 
                  height: `${(data.revenue / maxRevenue) * 100}%`,
                  minHeight: '20px'
                }}
              >
                <div 
                  className="w-full bg-primary rounded-t-sm"
                  style={{ height: '100%' }}
                ></div>
                
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${data.revenue.toLocaleString()}
                </div>
              </div>
              
              <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -ml-12">
          <span>${(maxRevenue / 1000).toFixed(0)}k</span>
          <span>${(maxRevenue * 0.75 / 1000).toFixed(0)}k</span>
          <span>${(maxRevenue * 0.5 / 1000).toFixed(0)}k</span>
          <span>${(maxRevenue * 0.25 / 1000).toFixed(0)}k</span>
          <span>$0</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total Growth</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">+52.6%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Avg Monthly</p>
          <p className="text-lg font-semibold text-foreground">$10,703</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Projected Next</p>
          <p className="text-lg font-semibold text-primary">$13,500</p>
        </div>
      </div>
    </div>
  );
}
