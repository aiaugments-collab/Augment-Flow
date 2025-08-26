'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../../../lib/auth-context';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ isCollapsed: _isCollapsed = false, onToggle: _onToggle }: AdminSidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div 
      className="text-sidebar-foreground flex h-full flex-col bg-sidebar-background border-r border-border transition-all duration-300 ease-in-out w-24 relative"
    >
      <div className="flex flex-row h-full">
        <div className="w-24 flex-shrink-0 bg-sidebar-background">
          <div className="h-full flex flex-col relative border-none">
            
            {/* Header */}
            <div className="flex-col gap-2 p-2 flex justify-center items-center py-6">
              <Link className="flex items-center justify-center cursor-pointer" href="/admin">
                <div className="flex flex-col items-center">
                  <Image
                    alt="Augment Flow Logo"
                    width={138}
                    height={38}
                    className="w-[90px] h-[24px] sm:w-[138px] sm:h-[38px]"
                    src="/augment-flow-logo.svg"
                    priority
                  />
                  <span className="text-xs text-muted-foreground mt-1">Admin</span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex min-h-0 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden flex-1 px-3 pt-2">
              <ul className="min-w-0 flex flex-col gap-2 w-full items-center">
                
                {/* Dashboard */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/admin">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname === '/admin' ? 'bg-background' : 'bg-background'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 transition-colors duration-200 ${pathname === '/admin' ? 'text-primary' : 'text-muted-foreground'}`}>
                      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                    </svg>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname === '/admin' ? 'text-foreground' : 'text-muted-foreground'}`}>Dashboard</span>
                </Link>

                {/* Users */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/admin/users">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname?.startsWith('/admin/users') ? 'bg-background' : 'bg-background group-hover:bg-background'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 transition-colors duration-200 ${pathname?.startsWith('/admin/users') ? 'text-primary' : 'text-muted-foreground'}`}>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m22 21-2-2"></path>
                      <path d="m19 21-2-2"></path>
                      <circle cx="19" cy="16" r="3"></circle>
                    </svg>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname?.startsWith('/admin/users') ? 'text-foreground' : 'text-muted-foreground'}`}>Users</span>
                </Link>

                {/* Subscriptions */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/admin/subscriptions">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname?.startsWith('/admin/subscriptions') ? 'bg-background' : 'bg-background group-hover:bg-background'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 transition-colors duration-200 ${pathname?.startsWith('/admin/subscriptions') ? 'text-primary' : 'text-muted-foreground'}`}>
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname?.startsWith('/admin/subscriptions') ? 'text-foreground' : 'text-muted-foreground'}`}>Subscriptions</span>
                </Link>

                {/* Agents */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/admin/agents">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname?.startsWith('/admin/agents') ? 'bg-background' : 'bg-background group-hover:bg-background'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 transition-colors duration-200 ${pathname?.startsWith('/admin/agents') ? 'text-primary' : 'text-muted-foreground'}`}>
                      <path d="M12 8V4H8"></path>
                      <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                      <path d="M2 14h2"></path>
                      <path d="M20 14h2"></path>
                      <path d="M15 13v2"></path>
                      <path d="M9 13v2"></path>
                    </svg>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname?.startsWith('/admin/agents') ? 'text-foreground' : 'text-muted-foreground'}`}>Agents</span>
                </Link>

                {/* Back to App */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/dashboard">
                    <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] bg-background group-hover:bg-background">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-colors duration-200 text-muted-foreground">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9,22 9,12 15,12 15,22"></polyline>
                      </svg>
                    </div>
                    <span className="text-xs font-medium leading-4 transition-colors duration-200 text-center text-muted-foreground">App</span>
                  </Link>
                </div>
              </ul>
            </div>

            {/* Footer - User Profile */}
            <div className="flex flex-col gap-2 p-2 px-3 pb-6">
              <div className="flex flex-col items-center gap-0.5 p-2">
                <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px]">
                  <span className="w-10 h-10 rounded-full border-2 border-border/20 flex items-center justify-center">
                    {user?.photoURL ? (
                      <Image
                        className="rounded-full"
                        src={user.photoURL}
                        alt="Profile"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user?.displayName?.[0] || user?.email?.[0] || 'A'}
                        </span>
                      </div>
                    )}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
