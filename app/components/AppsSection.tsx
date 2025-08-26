import Link from 'next/link';
import Image from 'next/image';

export default function AppsSection() {
  return (
    <section className="w-full py-10 lg:py-20 flex items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center text-center gap-6">
        <div 
          className="w-full relative" 
          style={{ 
            willChange: 'transform, filter, opacity', 
            opacity: 1, 
            filter: 'blur(0px)', 
            transform: 'none' 
          }}
        >
          {/* Apps Background Image - Desktop */}
          <Image
            alt="Apps logos and integrations"
            loading="lazy"
            width={1200}
            height={600}
            className="w-full h-auto hidden md:block"
            src="https://bhindi.io/landing-page/apps.svg"
            style={{ color: 'transparent' }}
          />
          
          {/* Apps Background Image - Mobile */}
          <Image
            alt="Apps logos and integrations"
            loading="lazy"
            width={1200}
            height={600}
            className="w-full h-auto block md:hidden"
            src="https://bhindi.io/landing-page/apps-mobile.svg"
            style={{ color: 'transparent' }}
          />

          {/* Content Overlay */}
          <div className="w-full absolute inset-0 top-1/4 translate-y-1/4 lg:top-1/4 lg:translate-y-0 flex items-center justify-center flex-col gap-4">
            <div 
              style={{ 
                willChange: 'transform, filter, opacity', 
                opacity: 1, 
                filter: 'blur(0px)', 
                transform: 'translateY(0px)' 
              }}
            >
              <p className="text-primary text-sm md:text-base">Applications</p>
            </div>
            <div className="w-full max-w-3xl mx-auto space-y-2 px-4">
              <div 
                style={{ 
                  willChange: 'transform, filter, opacity', 
                  opacity: 1, 
                  filter: 'blur(0px)', 
                  transform: 'translateY(0px)' 
                }}
              >
                <p className="text-2xl md:text-3xl lg:text-5xl text-foreground text-center font-heading font-medium">
                  200+ Apps.<br />One simple command.
                </p>
              </div>
              <div 
                style={{ 
                  willChange: 'transform, filter, opacity', 
                  opacity: 1, 
                  filter: 'blur(0px)', 
                  transform: 'translateY(0px)' 
                }}
              >
                <p className="max-w-sm md:max-w-xl mx-auto text-xs md:text-base text-muted-foreground text-center">
                  Your words become actions across Gmail, Notion, GitHub, Slack, and every other platform you use daily.
                </p>
              </div>
              <div 
                style={{ 
                  willChange: 'transform, filter, opacity', 
                  opacity: 1, 
                  filter: 'blur(0px)', 
                  transform: 'translateY(0px)' 
                }}
              >
                <Link href="/agents">
                  <button 
                    data-slot="button" 
                    className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3 rounded-lg" 
                    aria-label="Agents Directory"
                  >
                    <span className="text-sm font-medium">Agents Directory</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
