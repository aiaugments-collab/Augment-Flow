import Image from 'next/image';

export default function BackgroundAgentsSection() {
  return (
    <div className="w-full container mx-auto px-5 md:px-0 flex flex-col items-center gap-10 py-20">
      <div 
        style={{ 
          willChange: 'transform, filter, opacity', 
          opacity: 1, 
          filter: 'blur(0px)', 
          transform: 'none' 
        }}
      >
        <h2 className="text-3xl md:text-5xl font-heading font-medium text-foreground">Background Agents</h2>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-6">
        
        {/* Left Column */}
        <div className="w-full lg:flex-[0.4] flex flex-col gap-6">
          
          {/* Smart Scheduling Card */}
          <div 
            className="lg:flex-[0.4] relative w-full border flex flex-col items-center justify-center gap-5 p-14 rounded-3xl" 
            style={{ 
              willChange: 'transform, filter, opacity', 
              opacity: 1, 
              filter: 'blur(0px)', 
              transform: 'none' 
            }}
          >
            <p className="text-center text-xl md:text-3xl font-heading">
              Smart scheduling<br />for complex workflows
            </p>
            <div className="absolute bottom-1 right-1">
              <div className="flex items-center justify-center p-2.5 rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-down-right w-5 h-5 text-primary">
                  <path d="M19 13V19H13"></path>
                  <path d="M5 5L19 19"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Automation vs Anticipation Card */}
          <div 
            className="lg:flex-[0.6] w-full flex flex-col md:flex-row lg:flex-col bg-background rounded-3xl" 
            style={{ 
              willChange: 'transform, filter, opacity', 
              opacity: 1, 
              filter: 'blur(0px)', 
              transform: 'none' 
            }}
          >
            <div className="w-full lg:flex-[0.5] flex items-center justify-center p-8 gap-4 flex-col">
              <p className="text-xl font-medium">The difference between automation and anticipation</p>
              <p className="text-sm text-muted-foreground">
                These agents don&apos;t just follow scripts - they adapt, learn patterns, and evolve your workflows over time.
              </p>
            </div>
            <div className="w-full lg:flex-[0.5]">
              <Image
                alt="background-agents"
                loading="lazy"
                width={395}
                height={320}
                className="w-full h-full object-cover"
                src="https://bhindi.io/landing-page/background-agents/1.svg"
                style={{ color: 'transparent' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:flex-[0.6] flex flex-col gap-6">
          
          {/* Top Row */}
          <div className="w-full h-full lg:flex-[0.6] flex flex-col lg:flex-row gap-6">
            
            {/* Competitive Advantage Card */}
            <div 
              className="lg:flex-[0.5] w-full flex flex-col md:flex-row lg:flex-col bg-background rounded-3xl" 
              style={{ 
                willChange: 'transform, filter, opacity', 
                opacity: 1, 
                filter: 'blur(0px)', 
                transform: 'none' 
              }}
            >
              <div className="w-full lg:flex-[0.5]">
                <Image
                  alt="background-agents"
                  loading="lazy"
                  width={395}
                  height={320}
                  className="w-full h-full object-cover"
                  src="https://bhindi.io/landing-page/background-agents/2.svg"
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className="w-full lg:flex-[0.5] flex items-center justify-center p-8 gap-4 flex-col">
                <p className="text-xl font-medium">Your competitive advantage runs in the background</p>
                <p className="text-sm text-muted-foreground">
                  While others manually check trends and update spreadsheets, your agents are already three moves ahead.
                </p>
              </div>
            </div>

            {/* 200+ Apps Card */}
            <div 
              className="lg:flex-[0.5] w-full flex flex-col md:flex-row lg:flex-col border rounded-3xl" 
              style={{ 
                willChange: 'transform, filter, opacity', 
                opacity: 1, 
                filter: 'blur(0px)', 
                transform: 'none' 
              }}
            >
              <div className="w-full lg:flex-[0.5]">
                <Image
                  alt="background-agents"
                  loading="lazy"
                  width={395}
                  height={320}
                  className="w-full h-full object-cover"
                  src="https://bhindi.io/landing-page/background-agents/3.png"
                  style={{ color: 'transparent' }}
                />
              </div>
              <div className="w-full lg:flex-[0.5] flex items-center justify-center p-8 gap-4 flex-col">
                <p className="text-5xl text-primary font-medium font-heading">200+</p>
                <p className="text-sm text-foreground text-center">
                  Your apps, primed and<br />waiting for your command.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row - Invisible Layer Card */}
          <div 
            className="lg:flex-[0.4] w-full flex flex-col md:flex-row border rounded-3xl" 
            style={{ 
              willChange: 'transform, filter, opacity', 
              opacity: 1, 
              filter: 'blur(0px)', 
              transform: 'none' 
            }}
          >
            <div className="w-full lg:flex-[0.5]">
              <Image
                alt="background-agents"
                loading="lazy"
                width={395}
                height={320}
                className="w-full h-full object-cover"
                src="https://bhindi.io/landing-page/background-agents/4.svg"
                style={{ color: 'transparent' }}
              />
            </div>
            <div className="w-full lg:flex-[0.5] flex items-center justify-center p-8 gap-4 flex-col">
              <p className="text-xl font-medium">The invisible layer where chaos becomes clarity</p>
              <p className="text-sm text-muted-foreground">
                These agents don&apos;t just follow scripts - they adapt, learn patterns, and evolve your workflows over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
