'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/DashboardLayout';
import EnergyDisplay from '../components/EnergyDisplay';
import ContactTeamButton from '../components/ContactTeamButton';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';

export default function PromptsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Energy Display */}
        <EnergyDisplay energy={50} />

        {/* Main Content */}
        <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
          <div className="flex flex-col h-[calc(100dvh-64px)] lg:h-[100dvh] bg-background w-full">
            <div className="w-full h-full overflow-y-auto">
              <div className="w-full px-4 md:px-10 py-10 lg:px-32 lg:py-16">
                {/* Header */}
                <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                    Saved Prompts
                  </h1>
                  
                  {/* Search and New Prompt Button */}
                  <div className="flex gap-2 items-center">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-10 w-full min-w-0 border px-3 shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 pr-4 max-w-100 flex-grow py-3 text-xs text-foreground placeholder:text-muted-foreground bg-card border-border rounded-xl focus:ring-primary/20 transition-all duration-200 truncate"
                        placeholder="Search prompts..."
                        defaultValue=""
                      />
                    </div>
                    
                    {/* New Prompt Button */}
                    <Link
                      href="/prompts/create"
                      className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                    >
                      <button className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                        <Plus className="h-4 w-4 mr-1 font-bold" />
                        New Prompt
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center pt-16">
                  <p className="text-muted-foreground text-sm">No prompts yet</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Contact Team Button */}
        <ContactTeamButton />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
