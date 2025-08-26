'use client';

import { useState } from 'react';

const workflowSteps = [
  'Enter Prompt',
  'Augment Flow Agents Connected', 
  'Creating Overview',
  'Generating Graph',
  'Drafting post for X',
  'Prompt Executed'
];

const stepDescriptions = [
  'Add or record any task prompt you want to do with Augment Flow using popular Apps or services.',
  'Augment Flow AI system connects its agents to Gmail, authenticates access, and locates the relevant email or attachment containing the annual report.',
  'AI parses the report content and summarizes the key insights—highlighting revenue, growth, milestones, and other important metrics.',
  'The assistant visualizes critical data (e.g., quarterly performance, revenue trends, client growth) as a graph image to support the overview.',
  'An AI-generated social media post is created for platform X (formerly Twitter), summarizing the annual report highlights in a shareable format.',
  'Task successfully completed—all requested content generated and ready for review, use, or distribution.'
];

export default function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(5); // Last step active by default

  return (
    <div className="w-full flex flex-col items-center gap-6 md:gap-12 py-20 px-5 lg:px-32">
      <div 
        style={{ 
          willChange: 'transform, filter, opacity', 
          opacity: 1, 
          filter: 'blur(0px)', 
          transform: 'translateY(0px)' 
        }}
      >
        <h1 className="text-2xl md:text-4xl font-medium font-heading text-center">How Augment Flow Works</h1>
      </div>

      <div 
        className="w-full pointer-events-none flex justify-center" 
        style={{ 
          willChange: 'transform, filter, opacity', 
          opacity: 1, 
          filter: 'blur(0px)', 
          transform: 'translateY(0px)' 
        }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-md md:max-w-6xl mx-auto md:rounded-xl md:shadow-2xl overflow-hidden gap-4 md:gap-8" style={{ height: 'auto' }}>
          
          {/* Desktop Timeline - Left Side */}
          <div className="hidden md:flex">
            <div className="w-[320px] flex flex-col h-full shrink-0">
              <div className="flex gap-3 flex-1">
                {/* Progress Line */}
                <div className="flex flex-col items-center w-6 shrink-0 h-full">
                  <div className="relative h-full w-0.5">
                    <div className="absolute top-0 left-0 h-full w-full bg-muted"></div>
                    <div 
                      className="absolute top-0 left-0 w-full bg-primary" 
                      style={{ height: '100%' }}
                    ></div>
                  </div>
                </div>

                {/* Timeline Steps */}
                <div className="flex-1 flex flex-col h-full">
                  {workflowSteps.map((step, index) => (
                    <div key={index} className="relative flex-1 flex items-center gap-3">
                      <div className="pb-4">
                        <h1 className="text-xl font-medium text-foreground">{step}</h1>
                        {index === workflowSteps.length - 1 && (
                          <p className="text-sm text-muted-foreground mt-1 overflow-hidden" style={{ opacity: 1, height: 'auto', marginTop: '4px' }}>
                            Task successfully completed—all requested content generated and ready for review, use, or distribution.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface - Right Side */}
          <div className="w-full md:flex-1 flex flex-col" style={{ height: 'clamp(500px, 70vh, 700px)' }}>
            <div className="flex-1 bg-background rounded-lg flex flex-col overflow-hidden">
              
              {/* Chat Messages */}
              <div className="flex-1 pointer-events-none relative overflow-hidden flex flex-col space-y-3 p-4 pb-20">
                
                {/* User Message */}
                <div className="max-w-[90%] md:max-w-[60%] self-end" style={{ opacity: 1, transform: 'none' }}>
                  <div className="px-3 py-1.5 md:px-5 md:py-3 bg-emerald-800/10 rounded-[16px] rounded-br-[2px]">
                    <p className="text-foreground font-medium text-sm md:text-base">
                      Draw Annual Report from Mark I have received on Gmail, generate a small overview, generate graph image, and draft a post for X.
                    </p>
                  </div>
                </div>

                {/* Service Connections */}
                <div className="self-center" style={{ opacity: 1, transform: 'none' }}>
                  <div className="flex py-3 px-4 rounded-full border border-border items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="w-4 h-4">
                        <g clipPath="url(#clip0_442_1521)">
                          <path d="M1.36364 14.9996H4.54545V7.27237L0 3.86328V13.636C0 14.3906 0.611364 14.9996 1.36364 14.9996Z" fill="#4285F4"></path>
                          <path d="M15.4546 14.9996H18.6364C19.391 14.9996 20 14.3883 20 13.636V3.86328L15.4546 7.27237" fill="#34A853"></path>
                          <path d="M15.4546 1.3636V7.27269L20 3.8636V2.04542C20 0.359053 18.075 -0.602311 16.7273 0.409053" fill="#FBBC04"></path>
                          <path d="M4.54541 7.27237V1.36328L9.99996 5.45419L15.4545 1.36328V7.27237L9.99996 11.3633" fill="#EA4335"></path>
                          <path d="M0 2.04542V3.8636L4.54545 7.27269V1.3636L3.27273 0.409053C1.92273 -0.602311 0 0.359053 0 2.04542Z" fill="#C5221F"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_442_1521">
                            <rect width="20" height="15" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground text-xs">Gmail</span>
                      <span className="text-muted-foreground text-xs font-normal">joined</span>
                    </div>
                  </div>
                </div>

                <div className="self-center" style={{ opacity: 1, transform: 'none' }}>
                  <div className="flex py-3 px-4 rounded-full border border-border items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none" className="w-4 h-4">
                        <path d="M12.35 5H16.5372C16.9487 5 17.1548 4.37198 16.8637 4.00485L13.8265 0.170841C13.6462 -0.056947 13.3538 -0.056947 13.1735 0.170841L10.1363 4.00458C9.8452 4.37198 10.0513 4.99972 10.4628 4.99972L12.35 5Z" fill="#78D2BE"></path>
                        <path d="M14.4223 19H12.5777C12.2586 19 12 18.7546 12 18.4517V4.5483C12 4.24544 12.2586 4 12.5777 4H14.4223C14.7414 4 15 4.24544 15 4.5483V18.4517C15 18.7546 14.7414 19 14.4223 19Z" fill="#78D2BE"></path>
                        <path d="M10.4223 19H8.57765C8.25858 19 8 18.759 8 18.4617V7.53833C8 7.24097 8.25858 7 8.57765 7H10.4223C10.7414 7 11 7.24097 11 7.53833V18.4617C11 18.759 10.7412 19 10.4223 19Z" fill="#A5D76E"></path>
                        <path d="M6.42235 19H4.57765C4.25858 19 4 18.7661 4 18.4775V10.5225C4 10.2339 4.25858 10 4.57765 10H6.42235C6.74142 10 7 10.2339 7 10.5225V18.4775C7 18.7661 6.74142 19 6.42235 19Z" fill="#FFC36E"></path>
                        <path d="M2.42235 19H0.57765C0.258577 19 0 18.7423 0 18.4243V12.5757C0 12.2577 0.258577 12 0.57765 12H2.42235C2.74142 12 3 12.2577 3 12.5757V18.4243C3 18.7423 2.74121 19 2.42235 19Z" fill="#D2555A"></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground text-xs">Quickchart</span>
                      <span className="text-muted-foreground text-xs font-normal">joined</span>
                    </div>
                  </div>
                </div>

                <div className="self-center" style={{ opacity: 1, transform: 'none' }}>
                  <div className="flex py-3 px-4 rounded-full border border-border items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-4 h-4">
                        <path d="M11.025 0H13.172L8.482 5.9297L14 14H9.68L6.294 9.1064L2.424 14H0.275L5.291 7.65542L0 0.00110339H4.43L7.486 4.4732L11.025 0ZM10.27 12.5788H11.46L3.78 1.34726H2.504L10.27 12.5788Z" fill="black"></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground text-xs">X (Twitter)</span>
                      <span className="text-muted-foreground text-xs font-normal">joined</span>
                    </div>
                  </div>
                </div>

                {/* System Messages */}
                <div className="max-w-[85%] self-start" style={{ opacity: 1, transform: 'none' }}>
                  <div className="text-foreground text-xs whitespace-pre-line">
                    I&apos;ll help you post this thread on Twitter. Let me break it down into individual tweets for the thread.
                  </div>
                </div>

                {/* Action Cards */}
                <div className="w-[90%] md:w-[60%] self-start" style={{ opacity: 1, transform: 'none' }}>
                  <div className="bg-background border rounded-[16px] flex items-center px-4 py-3 gap-3">
                    <div className="bg-[#141619] p-2 rounded-full">
                      <div className="w-4 h-4 flex items-center justify-center text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none" className="w-4 h-4">
                          <g clipPath="url(#clip0_442_1521)">
                            <path d="M1.36364 14.9996H4.54545V7.27237L0 3.86328V13.636C0 14.3906 0.611364 14.9996 1.36364 14.9996Z" fill="#4285F4"></path>
                            <path d="M15.4546 14.9996H18.6364C19.391 14.9996 20 14.3883 20 13.636V3.86328L15.4546 7.27237" fill="#34A853"></path>
                            <path d="M15.4546 1.3636V7.27269L20 3.8636V2.04542C20 0.359053 18.075 -0.602311 16.7273 0.409053" fill="#FBBC04"></path>
                            <path d="M4.54541 7.27237V1.36328L9.99996 5.45419L15.4545 1.36328V7.27237L9.99996 11.3633" fill="#EA4335"></path>
                            <path d="M0 2.04542V3.8636L4.54545 7.27269V1.3636L3.27273 0.409053C1.92273 -0.602311 0 0.359053 0 2.04542Z" fill="#C5221F"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex-1 flex items-start gap-2">
                        <span className="font-medium text-foreground text-xs">Gmail findContent</span>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-primary">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="text-muted-foreground text-xs">email: [Annual Report.pdf], action: [extractContent]</div>
                    </div>
                  </div>
                </div>

                {/* Continue with more action cards... */}
                <div className="max-w-[85%] self-start" style={{ opacity: 1, transform: 'none' }}>
                  <div className="text-foreground text-xs whitespace-pre-line">
                    Your post with Annual Report has been successfully posted to Twitter.
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 pointer-events-none relative">
                <div className="w-full flex flex-col gap-2 p-3 rounded-[16px] border border-border bg-background transition-colors duration-200" style={{ opacity: 1, transform: 'none' }}>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center pointer-events-none px-2">
                      <p className="text-muted-foreground truncate text-xs md:text-sm">Message Augment Flow...</p>
                    </div>
                    <textarea 
                      className="w-full text-xs md:text-sm bg-transparent border-none outline-none text-foreground p-2 resize-none overflow-y-auto" 
                      disabled 
                      rows={1} 
                      aria-label="Message input" 
                      readOnly 
                      style={{ minHeight: '24px', maxHeight: '64px' }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-[6px] bg-muted flex items-center justify-center" disabled aria-label="Select Agents">
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
                        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 size-9" 
                        disabled 
                        aria-label="Send message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send text-foreground">
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

          {/* Mobile Timeline */}
          <div className="md:hidden w-full">
            <div className="w-full flex flex-col items-center px-4 py-6">
              <div className="relative w-full max-w-xs" role="region" aria-roledescription="carousel">
                <div className="overflow-hidden">
                  <div className="flex -ml-4" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                    {workflowSteps.map((step, index) => (
                      <div key={index} role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-4 text-center">
                        <div className="py-4">
                          <h3 className="text-base font-semibold text-foreground mb-2">{step}</h3>
                          <p className="text-xs text-muted-foreground">{stepDescriptions[index]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex space-x-2">
                {workflowSteps.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                      index === currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label={`Step ${index + 1}: ${workflowSteps[index]}`}
                    aria-current={index === currentStep}
                    disabled
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
