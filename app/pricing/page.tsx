import Link from 'next/link';
import Image from 'next/image';
import { Package, Zap, PackageOpen, Check } from 'lucide-react';
import StaticPageLayout from '../components/StaticPageLayout';

export default function PricingPage() {
  return (
    <StaticPageLayout>
      <div className="min-h-[60vh] py-10 w-full flex flex-col items-center justify-center gap-10 md:gap-24">
      {/* Header */}
      <h1 className="text-3xl lg:text-5xl font-medium font-heading">Individual Pricing Plans</h1>
      
      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        
        {/* Basic Plan */}
        <div className="relative border border-border rounded-3xl p-10 shadow-lg flex flex-col gap-6 items-start justify-between">
          {/* Header */}
          <div className="flex items-center gap-4 w-full">
            <div className="bg-secondary rounded-lg p-3 flex items-center justify-center w-12 h-12">
              <Package className="w-6 h-6" />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-medium text-lg text-foreground">Basic Plan</p>
              <p className="text-xs text-muted-foreground font-medium">For Individual Use</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-6 w-full flex-grow">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-heading font-medium text-foreground">Free</h2>
              <p className="text-sm text-muted-foreground">Free tier for exploring Augment Flow&apos;s core capabilities</p>
            </div>
            
            {/* Features */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground font-medium">50 Credits Per Month</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground font-medium">Standard Tool Connection</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link 
            href="/auth/login"
            className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          >
            <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 px-6 has-[>svg]:px-4 rounded-xl">
              <span className="text-sm font-medium">Get Started</span>
            </button>
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-primary/5 rounded-3xl p-10 shadow-lg flex flex-col gap-6 items-start justify-between z-10">
          {/* Background Badge */}
          <div className="absolute bottom-0 right-0 opacity-10 z-0">
            <Image
              alt="Pro Plan Badge"
              width={300}
              height={300}
              className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
              src="/pricing-augment-flow.svg"
              style={{ color: 'transparent' }}
            />
          </div>
          
          {/* Header */}
          <div className="flex items-center gap-4 w-full z-10">
            <div className="bg-primary/20 rounded-lg p-3 flex items-center justify-center w-12 h-12">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-medium text-lg text-foreground">Pro Plan</p>
              <p className="text-xs text-foreground font-medium">For Professionals who need more power</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-6 w-full z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-heading font-medium text-primary">$5</h2>
                <p className="text-sm font-medium text-foreground">/ first month</p>
              </div>
              <p className="text-sm text-foreground">
                <span>Then </span>
                <span className="text-primary">20$ per month</span>
              </p>
            </div>
            
            {/* Features */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground font-medium">500 Credits Per Month</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground font-medium">All Tools Connections</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground font-medium">Priority Email Support</p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="z-10">
            <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-6 has-[>svg]:px-4 rounded-xl">
              <span className="text-sm font-medium">Subscribe Now</span>
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="relative border border-border rounded-3xl p-10 shadow-lg flex flex-col gap-6 items-start justify-between">
          {/* Header */}
          <div className="flex items-center gap-4 w-full">
            <div className="bg-primary/10 rounded-xl p-3 flex items-center justify-center w-12 h-12">
              <PackageOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-medium text-lg text-foreground">Enterprise</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-medium text-foreground">Need an Enterprise Solution?</h2>
              <p className="text-sm text-muted-foreground">
                Tailored solutions for large teams and complex workflows, custom solutions, dedicated support and enterprise-grade security.
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link href="/contact" className="w-full">
            <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 px-6 has-[>svg]:px-4 w-fit rounded-xl">
              <span className="text-sm font-medium">Contact Us</span>
            </button>
          </Link>
        </div>
      </div>
      </div>
    </StaticPageLayout>
  );
}
