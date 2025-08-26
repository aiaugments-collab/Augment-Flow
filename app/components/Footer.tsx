import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="relative w-full h-[100dvh] md:h-[70dvh] 2xl:h-[50dvh]" style={{ clipPath: 'polygon(0% 0px, 100% 0%, 100% 100%, 0px 100%)' }}>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 h-[100dvh] md:h-[70dvh] 2xl:h-[50dvh]">
        <div className="h-full w-full">
          <div className="h-full max-w-[1536px] mx-auto flex flex-col justify-between items-center">
            {/* Main Footer Content */}
            <footer className="w-full text-foreground px-4 py-8 md:py-12">
              <div className="w-full flex flex-col lg:flex-row md:justify-between md:items-start gap-10 md:gap-20">
                {/* Logo and Description */}
                <div className="flex-1 flex flex-col gap-4 min-w-[220px]">
                  <Image
                    alt="Augment Flow logo"
                    width={138}
                    height={38}
                    className="w-[90px] h-[24px] sm:w-[138px] sm:h-[38px]"
                    src="/augment-flow-logo.svg"
                  />
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:max-w-sm">
                    Augment Flow is your AI-powered sous-chef, connecting your favorite apps to whip up seamless workflows in a snap.
                  </p>
                  {/* Social Links */}
                  <div className="flex gap-3 mt-2">
                    <Link
                      className="inline-flex cursor-pointer gap-2 whitespace-nowrap text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background rounded-lg p-2 hover:bg-primary/10 transition-colors"
                      aria-label="X"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://x.com/augmentflow"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.025 0H13.172L8.482 5.9297L14 14H9.68L6.294 9.1064L2.424 14H0.275L5.291 7.65542L0 0.00110339H4.43L7.486 4.4732L11.025 0ZM10.27 12.5788H11.46L3.78 1.34726H2.504L10.27 12.5788Z" />
                      </svg>
                    </Link>
                    <Link
                      className="inline-flex cursor-pointer gap-2 whitespace-nowrap text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background rounded-lg p-2 hover:bg-primary/10 transition-colors"
                      aria-label="Discord"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://discord.gg/augmentflow"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex-grow w-full grid grid-cols-2 md:grid-cols-3 gap-8 mt-8 md:mt-0">
                  {/* Company */}
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Company</h4>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          href="/pricing"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          href="/contact"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Social */}
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Social</h4>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://x.com/augmentflow"
                        >
                          Follow on X
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://discord.gg/augmentflow"
                        >
                          Join Discord
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-heading text-lg font-semibold mb-3">Resources</h4>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          href="https://docs.augmentflow.com"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          href="/privacy-policy"
                        >
                          Privacy policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-muted-foreground transition-all hover:underline underline-offset-4 decoration-primary"
                          href="/terms"
                        >
                          Terms of service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>

            {/* Large Brand Text with Copyright */}
            <div className="h-20 md:h-40 overflow-hidden flex items-center justify-center w-full relative">
              <h1 
                className="font-heading tracking-tighter text-[130px] sm:text-[200px] md:text-[275px] lg:text-[300px] font-bold bg-gradient-to-r from-primary/10 to-muted text-transparent bg-clip-text"
                style={{ transform: 'translateY(10%)' }}
              >
                Augment Flow
              </h1>
              <p className="absolute left-1/2 bottom-5 -translate-x-1/2 w-full text-center text-xs sm:text-sm text-muted-foreground z-10">
                @augmentflow.com - all rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
