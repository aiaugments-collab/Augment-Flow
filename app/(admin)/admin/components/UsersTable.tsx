'use client';

import { useState } from 'react';
// import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'free' | 'pro';
  signupDate: string;
  lastSeen: string;
  agentUsage: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    status: 'active',
    plan: 'pro',
    signupDate: '2025-01-15',
    lastSeen: '2 hours ago',
    agentUsage: 127
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    status: 'active',
    plan: 'free',
    signupDate: '2025-01-10',
    lastSeen: '1 day ago',
    agentUsage: 45
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'alex.rivera@startup.io',
    status: 'active',
    plan: 'pro',
    signupDate: '2025-01-08',
    lastSeen: '3 hours ago',
    agentUsage: 89
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@freelance.com',
    status: 'inactive',
    plan: 'free',
    signupDate: '2025-01-05',
    lastSeen: '2 weeks ago',
    agentUsage: 12
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.wilson@agency.co',
    status: 'active',
    plan: 'pro',
    signupDate: '2025-01-03',
    lastSeen: '5 minutes ago',
    agentUsage: 203
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@corp.com',
    status: 'suspended',
    plan: 'free',
    signupDate: '2024-12-28',
    lastSeen: '1 week ago',
    agentUsage: 8
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@tech.io',
    status: 'active',
    plan: 'pro',
    signupDate: '2024-12-25',
    lastSeen: '1 hour ago',
    agentUsage: 156
  },
  {
    id: '8',
    name: 'Sophie Brown',
    email: 'sophie.brown@design.studio',
    status: 'active',
    plan: 'free',
    signupDate: '2024-12-20',
    lastSeen: '6 hours ago',
    agentUsage: 34
  }
];

interface UsersTableProps {
  searchQuery: string;
  statusFilter: string;
}

export default function UsersTable({ searchQuery, statusFilter }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Filter users based on search and status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            Inactive
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Suspended
          </span>
        );
    }
  };

  const getPlanBadge = (plan: User['plan']) => {
    switch (plan) {
      case 'pro':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Pro
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Free
          </span>
        );
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Table Header Actions */}
      {selectedUsers.length > 0 && (
        <div className="px-6 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Activate
            </button>
            <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
              Suspend
            </button>
            <button className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/90">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={selectAllUsers}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Plan</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Signup Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Seen</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Agent Usage</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4">
                  {getPlanBadge(user.plan)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(user.signupDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {user.lastSeen}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {user.agentUsage} executions
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-primary hover:text-primary/80 text-sm">
                      View
                    </button>
                    <button className="text-muted-foreground hover:text-foreground text-sm">
                      Edit
                    </button>
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
          Showing {filteredUsers.length} of {mockUsers.length} users
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
