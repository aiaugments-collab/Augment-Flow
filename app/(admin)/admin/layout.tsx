'use client';

import { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import ProtectedRoute from '../../components/ProtectedRoute';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div 
        className="group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full" 
        style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem" } as React.CSSProperties}
      >
        <div className="flex h-[100dvh] w-full relative">
          
          {/* Admin Sidebar */}
          <AdminSidebar 
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Sidebar Toggle Button */}
          <div className="absolute top-6 left-28 flex gap-2 z-10">
            <button 
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-left-open w-4 h-4">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
                <path d="m14 9 3 3-3 3"></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
          </div>

          {/* Main Content */}
          <main className="bg-background relative flex w-full flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 flex-1">
            <div className="flex-1 bg-background overflow-y-auto">
              <div className="w-full p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
