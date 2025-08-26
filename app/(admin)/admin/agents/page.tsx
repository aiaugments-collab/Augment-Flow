'use client';

import { useState } from 'react';
import AgentStats from '../components/AgentStats';
import AgentsPerformance from '../components/AgentsPerformance';
import AgentExecutionLogs from '../components/AgentExecutionLogs';

export default function AgentsPage() {
  const [timeFilter, setTimeFilter] = useState('7d');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground">Agents Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor agent performance, track executions, and analyze usage patterns
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Time Period:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-1 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v5h5"></path>
            <path d="M3 8a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 4"></path>
            <path d="M21 21v-5h-5"></path>
            <path d="M21 16a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 20"></path>
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Agent Stats */}
      <AgentStats />

      {/* Agents Performance */}
      <AgentsPerformance />

      {/* Recent Execution Logs */}
      <AgentExecutionLogs />
    </div>
  );
}
