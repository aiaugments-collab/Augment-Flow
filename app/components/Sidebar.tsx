'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../lib/auth-context';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
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
              <Link className="flex items-center justify-center cursor-pointer" href="/dashboard">
                <Image
                  alt="Augment Flow Logo"
                  width={138}
                  height={38}
                  className="w-[90px] h-[24px] sm:w-[138px] sm:h-[38px]"
                  src="/augment-flow-logo.svg"
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex min-h-0 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden flex-1 px-3 pt-2">
              <ul className="min-w-0 flex flex-col gap-2 w-full items-center">
                
                {/* Chats */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/dashboard">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname?.startsWith('/dashboard') ? 'bg-background' : 'bg-background'}`}>
                    <div className="relative">
                      <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 transition-colors duration-200 ${pathname?.startsWith('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}>
                        <path d="M12 19C15.771 19 16.657 19 17.828 17.828C18.999 16.656 19 14.771 19 11C19 7.229 19 6.343 17.828 5.172C16.656 4.001 14.771 4 12 4H9C5.229 4 3.343 4 2.172 5.172C1.001 6.344 1 7.229 1 11C1 14.771 1 16.657 2.172 17.828C2.825 18.482 3.7 18.771 5 18.898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.9999 15.8329C19.7744 15.6801 20.2687 15.3877 20.8279 14.828C21.9989 13.656 21.9999 11.771 21.9999 8C21.9999 4.229 21.9999 3.343 20.8279 2.172C19.6559 1.001 17.7709 1 14.9999 1H11.9999C8.2289 1 6.3429 1 5.1719 2.172C4.61276 2.73162 4.32037 3.22581 4.16748 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13 19.0003C11.7248 19.0003 10.2562 19.1193 8.97377 19.7354C6.91241 20.7259 5.88173 21.2217 5.37412 20.9055C4.86652 20.5894 4.96247 19.6113 5.1554 17.6541L5.19873 17.209" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        <path d="M14 11V11.0096" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        <path d="M10 11V11.0096" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        <path d="M6 11V11.0096" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                      </svg>
                    </div>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname?.startsWith('/dashboard') ? 'text-foreground' : 'text-muted-foreground'}`}>Chats</span>
                </Link>

                {/* Background */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/agents">
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] ${pathname?.startsWith('/agents') ? 'bg-background' : 'bg-background group-hover:bg-background'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-brain w-6 h-6 transition-colors duration-200 ${pathname?.startsWith('/agents') ? 'text-primary' : 'text-muted-foreground'}`}>
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                      <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                      <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                      <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                    </svg>
                  </div>
                  <span className={`text-xs font-medium leading-4 transition-colors duration-200 text-center ${pathname?.startsWith('/agents') ? 'text-foreground' : 'text-muted-foreground'}`}>Background</span>
                </Link>

                {/* Notifications */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/notifications">
                  <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] bg-background group-hover:bg-background">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell w-6 h-6 transition-colors duration-200 text-muted-foreground">
                        <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs font-medium leading-4 transition-colors duration-200 text-center text-muted-foreground">Notifications</span>
                </Link>

                {/* Apps */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/apps">
                  <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] bg-background group-hover:bg-background">
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-colors duration-200 text-muted-foreground">
                      <path d="M11.83 1.18011C11.5694 1.06126 11.2864 0.999756 11 0.999756C10.7136 0.999756 10.4305 1.06126 10.17 1.18011L1.59996 5.08011C1.42251 5.15836 1.27164 5.28651 1.16573 5.44897C1.05981 5.61143 1.00342 5.80118 1.00342 5.99511C1.00342 6.18905 1.05981 6.3788 1.16573 6.54126C1.27164 6.70371 1.42251 6.83187 1.59996 6.91011L10.18 10.8201C10.4405 10.939 10.7236 11.0005 11.01 11.0005C11.2964 11.0005 11.5794 10.939 11.84 10.8201L20.42 6.92011C20.5974 6.84187 20.7483 6.71371 20.8542 6.55126C20.9601 6.3888 21.0165 6.19905 21.0165 6.00511C21.0165 5.81118 20.9601 5.62143 20.8542 5.45897C20.7483 5.29651 20.5974 5.16836 20.42 5.09011L11.83 1.18011Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M1 11C0.99953 11.1913 1.05392 11.3787 1.15672 11.5399C1.25952 11.7012 1.40642 11.8297 1.58 11.91L10.18 15.82C10.4392 15.9374 10.7205 15.9981 11.005 15.9981C11.2895 15.9981 11.5708 15.9374 11.83 15.82L20.41 11.92C20.587 11.8404 20.737 11.7111 20.8418 11.5477C20.9466 11.3844 21.0015 11.1941 21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M1 16C0.99953 16.1913 1.05392 16.3787 1.15672 16.5399C1.25952 16.7012 1.40642 16.8297 1.58 16.91L10.18 20.82C10.4392 20.9374 10.7205 20.9981 11.005 20.9981C11.2895 20.9981 11.5708 20.9374 11.83 20.82L20.41 16.92C20.587 16.8404 20.737 16.7111 20.8418 16.5477C20.9466 16.3844 21.0015 16.1941 21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-xs font-medium leading-4 transition-colors duration-200 text-center text-muted-foreground">Apps</span>
                </Link>

                {/* Prompts */}
                <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/prompts">
                  <div className="w-10 h-10 flex items-center justify-center transition-colors duration-200 rounded-[10px] bg-background group-hover:bg-background">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-colors duration-200 text-muted-foreground">
                      <path d="M9 1H19M9 5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M4 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2C5 1.44772 4.55228 1 4 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M9 11H19M9 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M4 11H2C1.44772 11 1 11.4477 1 12V14C1 14.5523 1.44772 15 2 15H4C4.55228 15 5 14.5523 5 14V12C5 11.4477 4.55228 11 4 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-xs font-medium leading-4 transition-colors duration-200 text-center text-muted-foreground">Prompts</span>
                </Link>
              </ul>
            </div>

            {/* Footer - User Profile */}
            <div className="flex flex-col gap-2 p-2 px-3 pb-6">
              <Link className="flex flex-col items-center gap-0.5 p-2 cursor-pointer group" href="/profile">
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
                          {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                        </span>
                      </div>
                    )}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
