'use client';

import { useState } from 'react';
import SubscriptionStats from '../components/SubscriptionStats';
import SubscriptionsTable from '../components/SubscriptionsTable';
import RevenueChart from '../components/RevenueChart';

export default function SubscriptionsPage() {
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground">Subscription Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor billing, track revenue, and manage user subscriptions
        </p>
      </div>

      {/* Subscription Stats */}
      <SubscriptionStats />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Plans</option>
            <option value="free">Free Plan</option>
            <option value="pro">Pro Plan</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="past_due">Past Due</option>
          </select>
        </div>

        {/* Export Button */}
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>
          Export Data
        </button>
      </div>

      {/* Subscriptions Table */}
      <SubscriptionsTable planFilter={planFilter} statusFilter={statusFilter} />
    </div>
  );
}
