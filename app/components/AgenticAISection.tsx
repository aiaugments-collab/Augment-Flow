'use client';

import { useState } from 'react';

const roles = [
  'I\'m a marketer',
  'I\'m a developer', 
  'I\'m a recruiter',
  'I\'m a founder'
];

export default function AgenticAISection() {
  const [activeRole, setActiveRole] = useState(2); // Recruiter is active by default

  return (
    <div 
      className="flex flex-col my-[10dvh] max-w-5xl w-full mx-auto rounded-lg overflow-hidden gap-6 md:gap-10 px-5 lg:px-0" 
      style={{ 
        willChange: 'transform, filter, opacity', 
        opacity: 1, 
        filter: 'blur(0px)', 
        transform: 'translateY(0px)' 
      }}
    >
      <div>
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-heading text-foreground">Agentic AI for Everyone</h1>
          
          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {roles.map((role, index) => (
              <button
                key={index}
                className={`
                  relative px-6 py-4 rounded-full text-sm font-semibold cursor-pointer tracking-tight 
                  ${activeRole === index 
                    ? 'false' 
                    : 'hover:bg-primary/10 transition-all duration-300'
                  }
                `}
                aria-pressed={activeRole === index}
                onClick={() => setActiveRole(index)}
              >
                {activeRole === index && (
                  <div className="absolute inset-0 rounded-full bg-primary" style={{ opacity: 1 }}></div>
                )}
                <span 
                  className="relative z-10" 
                  style={{ 
                    color: activeRole === index 
                      ? 'hsl(var(--primary-foreground))' 
                      : 'hsl(var(--foreground))' 
                  }}
                >
                  {role}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="mt-6 md:mt-10 p-3 md:p-6 w-full bg-card flex flex-col border border-border rounded-[24px] backdrop-blur-md overflow-hidden justify-between h-[70dvh]">
          
          {/* Chat Messages Area */}
          <div className="flex-1 pointer-events-none relative overflow-hidden flex flex-col space-y-4 mb-10">
            {/* Empty for now - could add role-specific content here */}
          </div>

          {/* Chat Input */}
          <div className="flex pointer-events-none relative flex-col gap-2">
            <div 
              className="w-full flex flex-col gap-2 p-3 rounded-[16px] border border-primary bg-background transition-colors duration-200" 
              style={{ opacity: 1, transform: 'none' }}
            >
              <div className="relative w-full">
                <textarea 
                  className="w-full text-xs md:text-sm bg-transparent border-none outline-none text-foreground p-2 resize-none overflow-y-auto" 
                  rows={1} 
                  aria-label="Message input" 
                  style={{ minHeight: '24px', maxHeight: '64px', height: '56px' }}
                  value={activeRole === 2 ? 
                    "Augment Flow, collect interview notes from Notion, compile them into a Google Sheet for visibility, send follow-up emails to the shortlisted candidates via Gmail, and schedule final-round interviews on Google Calendar." :
                    "Type your message here..."
                  }
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-[6px] bg-muted flex items-center justify-center" aria-label="Select Agents">
                    <span className="text-sm font-medium text-muted-foreground">Select Agents</span>
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image text-muted-foreground">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic text-muted-foreground">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                  <button 
                    data-slot="button" 
                    className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 size-9 rounded-lg" 
                    aria-label="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                      <path d="m21.854 2.147-10.94 10.939"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
