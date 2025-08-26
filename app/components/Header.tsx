'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../lib/auth-context';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="flex w-full h-10 items-center justify-between">
      {/* Logo */}
      <Link 
        href="/" 
        className="cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground transition-all hover:underline underline-offset-4 decoration-primary flex items-center"
      >
        <Image
          alt="Augment Flow logo"
          width={138}
          height={38}
          className="w-[90px] h-[24px] sm:w-[138px] sm:h-[38px]"
          src="/augment-flow-logo.svg"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <Link 
          href="/pricing"
          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground transition-all hover:underline underline-offset-4 decoration-primary"
        >
          Pricing
        </Link>
        <Link 
          href="/contact"
          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground transition-all hover:underline underline-offset-4 decoration-primary"
        >
          Contact
        </Link>
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              <Link href="/dashboard" className="underline">
                Welcome, {user.displayName || user.email}
              </Link>
              
            </span>
            <button 
              onClick={handleLogout}
              data-slot="button" 
              className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-8 gap-1.5 px-3 has-[>svg]:px-2.5 rounded-lg"
            >
              <span className="text-xs font-medium">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              href="/auth/login"
              className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground hover:underline underline-offset-4 decoration-primary"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            >
              <button 
                data-slot="button" 
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 gap-1.5 px-3 has-[>svg]:px-2.5 rounded-lg"
              >
                <span className="text-xs font-medium">Get Started</span>
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Menu Button and Theme Toggle */}
      <div className="lg:hidden flex items-center gap-3">
        <ThemeToggle />
        <div 
          aria-label="Open menu" 
          role="button"
          tabIndex={0}
          aria-haspopup="dialog" 
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }
          }}
          className="cursor-pointer"
        >
          <span className="relative w-5 h-5 flex flex-col items-end justify-center">
            <span className="block rounded-full absolute h-0.5 w-4 bg-foreground transition-all duration-300 rotate-0 top-2"></span>
            <span className="block absolute h-0.5 rounded-full bg-foreground transition-all duration-300 rotate-0 top-4 w-2"></span>
          </span>
        </div>
      </div>
    </header>
  );
}
