import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-[60dvh] md:h-[80dvh] flex">
      <div className="flex w-full h-full items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <div className="w-full text-center space-y-4">
            <div style={{ willChange: 'transform, filter, opacity', opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
              <p className="text-sm font-medium text-primary">Introducing the Future of AI</p>
            </div>
            <div style={{ willChange: 'transform, filter, opacity', opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
              <h1 className="font-heading font-medium leading-tight text-4xl md:text-5xl lg:text-7xl text-foreground">
                AI Agent that works,<br />even when you&apos;re away
              </h1>
            </div>
            <div style={{ willChange: 'transform, filter, opacity', opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[720px] mx-auto">
                Your words become actions across every platform you use.<br className="hidden md:block" /> 
                200+ apps working towards a future where technology acts, not just responds.
              </p>
            </div>
          </div>
          <div style={{ willChange: 'transform, filter, opacity', opacity: 1, filter: 'blur(0px)', transform: 'none' }}>
            <div className="w-full flex items-center justify-center">
              <Link 
                className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" 
                aria-label="Try Augment Flow Now" 
                href="/auth/signup"
              >
                <button 
                  data-slot="button" 
                  className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-6 has-[>svg]:px-4 rounded-lg"
                >
                  <span className="text-sm font-medium">Try Augment Flow Now</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
