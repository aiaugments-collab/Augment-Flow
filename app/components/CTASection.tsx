import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="w-full py-10 lg:py-20">
      <div className="container mx-auto px-5">
        <div 
          style={{ 
            willChange: 'transform, filter, opacity', 
            opacity: 1, 
            filter: 'blur(0px)', 
            transform: 'translateY(0px)' 
          }}
        >
          <div className="w-full bg-primary/20 flex flex-col lg:flex-row gap-4 rounded-3xl lg:p-12 p-6 items-center justify-between relative overflow-hidden">
            {/* Background SVG */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center -z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="443" height="144" viewBox="0 0 443 144" fill="none">
                <path d="M221.091 -139L0 22.0635L84.4445 282.677H357.719L442.164 22.0635L221.091 -139ZM399.215 78.6723C367.628 78.4768 319.042 84.0576 293.925 63.7958C277.618 50.6789 266.646 34.4161 265.458 12.679C264.128 -11.8307 283.166 -35.7361 302.132 -50.9325L414.654 31.0391L399.215 78.6723ZM263.969 -78.7304C263.934 -78.7304 263.898 -78.7304 263.845 -78.7304C263.437 -77.5751 255.868 -55.9802 254.911 -53.5097C243.904 -24.7343 223.041 18.1178 196.435 34.8427C150.348 63.8136 120.693 -1.29099 109.757 -28.8755L221.073 -109.958L263.969 -78.7304ZM63.7766 4.60985C65.7264 6.01396 84.2496 19.2375 85.0472 19.8773C112.77 41.3656 134.112 67.2439 140.528 102.969C151.305 162.919 99.4935 173.228 74.6955 176.622L27.5101 31.0213L63.7766 4.60985ZM88.7696 220.008C92.3679 217.59 105.751 208.561 106.655 207.957C132.64 190.024 161.391 163.79 193.599 165.087C243.088 167.06 259.626 212.365 244.861 259.198H101.461L88.7696 220.008ZM340.721 259.181H295.467C285.807 228.326 266.273 177.102 277.6 145.927C292.454 105.013 345.684 106.47 383.138 128.278L340.721 259.181Z" fill="url(#paint0_linear_24000_6110)"></path>
                <defs>
                  <linearGradient id="paint0_linear_24000_6110" x1="221.082" y1="-139" x2="221.082" y2="282.677" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00C584" stopOpacity="0.13"></stop>
                    <stop offset="1" stopColor="#00C584" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <p className="text-2xl text-center lg:text-3xl font-heading font-medium">Join Us in Defining the Next Era of AI</p>
            
            <Link 
              href="/auth/signup"
              className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            >
              <button 
                data-slot="button" 
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 rounded-xl"
              >
                <span className="text-sm font-medium">Get Started</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
