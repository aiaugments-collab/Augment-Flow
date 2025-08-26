import StaticPageLayout from '../components/StaticPageLayout';

export default function ContactPage() {
  return (
    <StaticPageLayout>
      <div className="flex-1 flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full flex flex-col gap-8 items-center">
        {/* Header */}
        <div className="w-full flex flex-col gap-4 items-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium font-heading text-foreground text-center">
            Contact Us
          </h1>
          <p className="text-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto text-center">
            Have questions or feedback? We would love to hear from you!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="flex max-w-3xl flex-col lg:flex-row gap-4 w-full items-center justify-center">
          
          {/* Email Contact Card */}
          <a
            className="inline-flex cursor-pointer gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex-1 group relative overflow-hidden rounded-3xl border border-border p-6 transition-all duration-300 hover:shadow-xs max-w-sm"
            href="mailto:info@augmentflow.io"
          >
            <div className="flex items-center space-x-4 relative z-10 w-full">
              <div className="flex-shrink-0">
                <div className="p-4 bg-primary/20 flex items-center justify-center rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_803_14362)">
                      <path
                        opacity="0.4"
                        d="M4 4V8.03125V13.0063V15.6062C7.6 18.2687 11.1937 20.9375 14.7937 23.6C15.1438 23.8563 15.5688 24 16 24C16.4312 24 16.8562 23.8625 17.2062 23.6C20.8062 20.9375 24.4062 18.2687 28 15.6062V13.0063V8.03125V4C28 2.89375 27.1063 2 26 2H19.8625H12.1375H6C4.89375 2 4 2.89375 4 4ZM10 9C10 8.45 10.45 8 11 8H21C21.55 8 22 8.45 22 9C22 9.55 21.55 10 21 10H11C10.45 10 10 9.55 10 9ZM10 13C10 12.45 10.45 12 11 12H21C21.55 12 22 12.45 22 13C22 13.55 21.55 14 21 14H11C10.45 14 10 13.55 10 13Z"
                        fill="#00C584"
                      />
                      <path
                        d="M31.9875 12.6562C31.8875 11.525 31.3062 10.475 30.3813 9.79375L28 8.03125V13.0063V15.6062L31.9875 12.6562ZM32 28V15.1313L18.4 25.2062C17.7062 25.725 16.8625 26 16 26C15.1375 26 14.2938 25.725 13.6 25.2062L0 15.1313V28C0 30.2062 1.79375 32 4 32H28C30.2062 32 32 30.2062 32 28ZM4 15.6062V13.0063V8.03125L1.61875 9.79375C0.69375 10.475 0.1125 11.525 0.0125 12.6562L4 15.6062ZM18.0938 0.69375C17.4875 0.24375 16.7563 0 16 0C15.2437 0 14.5125 0.24375 13.9062 0.6875L12.1375 2H19.8563L18.0938 0.69375ZM11 8C10.45 8 10 8.45 10 9C10 9.55 10.45 10 11 10H21C21.55 10 22 9.55 22 9C22 8.45 21.55 8 21 8H11ZM11 12C10.45 12 10 12.45 10 13C10 13.55 10.45 14 11 14H21C21.55 14 22 13.55 22 13C22 12.45 21.55 12 21 12H11Z"
                        fill="#00C584"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_803_14362">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-muted-foreground text-sm font-medium break-words leading-relaxed whitespace-normal">
                  Email us at{' '}
                  <span className="text-foreground font-bold">info@augmentflow.io</span>
                </p>
              </div>
            </div>
          </a>

          {/* Twitter/X Contact Card */}
          <a
            className="inline-flex cursor-pointer gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex-1 group relative overflow-hidden rounded-3xl border border-border p-6 transition-all duration-300 hover:shadow-xs max-w-sm"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/augmentflow"
          >
            <div className="flex items-center space-x-4 relative z-10 w-full">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="h-16 w-16 text-foreground"
                >
                  <path
                    d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z"
                    fill="#16181B"
                  />
                  <path
                    d="M41.4431 18.2858H46.1758L35.8386 29.9041L48.0002 45.7143H38.4789L31.0211 36.1238L22.4871 45.7143H17.7525L28.809 33.2864L17.1431 18.2858H26.9074L33.6478 27.0497L41.4431 18.2858ZM39.7845 42.9299H42.4074L25.4803 20.9246H22.6684L39.7845 42.9299Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-muted-foreground text-sm font-medium break-words leading-relaxed whitespace-normal">
                  Follow us on X{' '}
                  <span className="text-foreground font-bold">@augmentflow</span> for the latest updates
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      </div>
    </StaticPageLayout>
  );
}
