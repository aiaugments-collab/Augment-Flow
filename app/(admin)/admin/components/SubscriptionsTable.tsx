'use client';

// import { useState } from 'react';

interface Subscription {
  id: string;
  userName: string;
  userEmail: string;
  plan: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  startDate: string;
  nextBilling: string;
  amount: number;
  paymentMethod: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@email.com',
    plan: 'pro',
    status: 'active',
    startDate: '2025-01-15',
    nextBilling: '2025-02-15',
    amount: 29.99,
    paymentMethod: '**** 1234'
  },
  {
    id: '2',
    userName: 'Mike Chen',
    userEmail: 'mike.chen@company.com',
    plan: 'free',
    status: 'active',
    startDate: '2025-01-10',
    nextBilling: '-',
    amount: 0,
    paymentMethod: '-'
  },
  {
    id: '3',
    userName: 'Alex Rivera',
    userEmail: 'alex.rivera@startup.io',
    plan: 'pro',
    status: 'active',
    startDate: '2025-01-08',
    nextBilling: '2025-02-08',
    amount: 29.99,
    paymentMethod: '**** 5678'
  },
  {
    id: '4',
    userName: 'Emma Davis',
    userEmail: 'emma.davis@freelance.com',
    plan: 'pro',
    status: 'canceled',
    startDate: '2025-01-05',
    nextBilling: '-',
    amount: 29.99,
    paymentMethod: '**** 9012'
  },
  {
    id: '5',
    userName: 'James Wilson',
    userEmail: 'james.wilson@agency.co',
    plan: 'pro',
    status: 'active',
    startDate: '2025-01-03',
    nextBilling: '2025-02-03',
    amount: 29.99,
    paymentMethod: '**** 3456'
  },
  {
    id: '6',
    userName: 'Lisa Anderson',
    userEmail: 'lisa.anderson@corp.com',
    plan: 'pro',
    status: 'past_due',
    startDate: '2024-12-28',
    nextBilling: '2025-01-28',
    amount: 29.99,
    paymentMethod: '**** 7890'
  },
  {
    id: '7',
    userName: 'David Kim',
    userEmail: 'david.kim@tech.io',
    plan: 'pro',
    status: 'active',
    startDate: '2024-12-25',
    nextBilling: '2025-02-25',
    amount: 29.99,
    paymentMethod: '**** 2345'
  },
  {
    id: '8',
    userName: 'Sophie Brown',
    userEmail: 'sophie.brown@design.studio',
    plan: 'free',
    status: 'active',
    startDate: '2024-12-20',
    nextBilling: '-',
    amount: 0,
    paymentMethod: '-'
  }
];

interface SubscriptionsTableProps {
  planFilter: string;
  statusFilter: string;
}

export default function SubscriptionsTable({ planFilter, statusFilter }: SubscriptionsTableProps) {
  // Filter subscriptions based on plan and status
  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesPlan = planFilter === 'all' || subscription.plan === planFilter;
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    return matchesPlan && matchesStatus;
  });

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        );
      case 'canceled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            Canceled
          </span>
        );
      case 'past_due':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Past Due
          </span>
        );
    }
  };

  const getPlanBadge = (plan: Subscription['plan']) => {
    switch (plan) {
      case 'pro':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Pro Plan
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Free Plan
          </span>
        );
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Plan</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Start Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Next Billing</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Payment</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {subscription.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{subscription.userName}</p>
                      <p className="text-sm text-muted-foreground">{subscription.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getPlanBadge(subscription.plan)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(subscription.status)}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">
                    {subscription.amount === 0 ? 'Free' : `$${subscription.amount}/month`}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {subscription.nextBilling === '-' ? '-' : new Date(subscription.nextBilling).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {subscription.paymentMethod}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-primary hover:text-primary/80 text-sm">
                      View
                    </button>
                    {subscription.status === 'active' && (
                      <button className="text-destructive hover:text-destructive/80 text-sm">
                        Cancel
                      </button>
                    )}
                    {subscription.status === 'past_due' && (
                      <button className="text-orange-600 hover:text-orange-500 text-sm">
                        Retry
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredSubscriptions.length} of {mockSubscriptions.length} subscriptions
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted/50 disabled:opacity-50" disabled>
            Previous
          </button>
          <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">1</span>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted/50">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted/50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
