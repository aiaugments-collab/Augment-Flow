'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleRefresh = () => {
    // TODO: Implement refresh functionality
    console.log('Refreshing notifications...');
  };

  const filterOptions = ['All', 'Unread', 'Read', 'Important'];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="bg-background relative flex w-full flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 flex-1">
          <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
            <div className="min-h-[100dvh] bg-background">
              <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-6">
                  
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
                      <p className="text-muted-foreground text-sm mt-1">All caught up</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleRefresh}
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw h-4 w-4 mr-2">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                          <path d="M21 3v5h-5"></path>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                          <path d="M8 16H3v5"></path>
                        </svg>
                        Refresh
                      </button>
                    </div>
                  </div>

                  {/* Filter Section */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter h-4 w-4 text-muted-foreground">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                      <span className="text-sm font-medium">Filter:</span>
                    </div>
                    
                    {/* Filter Dropdown */}
                    <div className="relative">
                      <button 
                        type="button" 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="border-input data-[placeholder]:text-zinc-400 [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9 w-32"
                      >
                        <span>{filter}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down size-4 opacity-50">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isFilterOpen && (
                        <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-10">
                          {filterOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setFilter(option);
                                setIsFilterOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="w-full space-y-3">
                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center pt-16 pb-8">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm">No notifications yet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
