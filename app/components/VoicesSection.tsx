import Image from 'next/image';

const testimonials = [
  {
    quote: "how @augmentflowai can make your college life easier.",
    author: "Amaan",
    handle: "@amaan8429",
    avatar: "https://bhindi.io/landing-page/bhindi-spectrum/2.jpg"
  },
  {
    quote: "This is basically the Founders Inc of Bengaluru\n3D printing, robotics, AI agents, and GPUs going brrrrrrr all under one roof in Koramangala 🔥",
    author: "Caleb",
    handle: "@caleb_friesen2", 
    avatar: "https://bhindi.io/landing-page/bhindi-spectrum/3.jpg"
  },
  {
    quote: "one of the best ways to scale your SaaS (if you have capital) is thru influencer marketing i've been doing this in HUGE volume for my recent products it only takes me minutes to find & send DMs to HUNDREDS of influencers (while I sleep) i used this ai (@augmentflowai) to do this outreach for me ...",
    author: "Rexan Wong",
    handle: "@rexan_wong",
    avatar: "https://bhindi.io/landing-page/bhindi-spectrum/4.jpg"
  },
  {
    quote: "There are two types of AWS users:\n- The ones who cry\n- And the ones who lie about not crying But both agree that the UI sucks. 2 likes and I'll use every one of these functions via Augment Flow. Just vibes.",
    author: "Buddhsen Tripathi", 
    handle: "@btr1pathi",
    avatar: "https://bhindi.io/landing-page/bhindi-spectrum/5.jpg"
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <figure className="relative w-80 h-[364px] cursor-pointer overflow-hidden rounded-3xl border p-6 gap-5 flex flex-col justify-between">
      <div className="flex-grow flex flex-col gap-4">
        {/* Quote icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17" fill="none">
          <g clipPath="url(#clip0_24000_6160)">
            <path d="M19.1378 6.00141C19.4409 4.15814 20.0251 2.37552 20.8689 0.719257C20.917 0.627462 20.935 0.522137 20.9201 0.418992C20.9052 0.315848 20.8583 0.22041 20.7863 0.146909C20.7143 0.0734087 20.6211 0.0257855 20.5206 0.011141C20.4201 -0.00350338 20.3177 0.0156153 20.2287 0.0656471C15.4422 2.93415 13.3302 7.12627 13.069 10.4845C12.8436 13.3817 14.7662 16.367 17.6819 16.9099C18.3952 17.0457 19.1279 17.0314 19.8357 16.8679C20.5435 16.7045 21.2116 16.3952 21.7998 15.9589C22.3879 15.5226 22.8838 14.9683 23.2575 14.3294C23.6311 13.6906 23.8748 12.9806 23.9737 12.2422C24.0727 11.5039 24.0248 10.7526 23.8331 10.0338C23.6414 9.31503 23.3098 8.64365 22.8583 8.06028C22.4068 7.47691 21.8448 6.99367 21.2064 6.63979C20.5679 6.28591 19.8662 6.06874 19.1438 6.00141H19.1378Z" fill="#24272C"></path>
            <path d="M6.09274 6.00141C6.39496 4.15874 6.97709 2.37629 7.81785 0.719257C7.86599 0.627462 7.88396 0.522137 7.86908 0.418992C7.8542 0.315848 7.80726 0.22041 7.73527 0.146909C7.66328 0.0734087 7.57009 0.0257855 7.4696 0.011141C7.36912 -0.00350338 7.26671 0.0156153 7.17767 0.0656471C2.39123 2.93415 0.27921 7.12627 0.01795 10.4845C-0.207411 13.3817 1.71514 16.367 4.63088 16.9099C5.34419 17.0457 6.07689 17.0314 6.78467 16.8679C7.49245 16.7045 8.16061 16.3952 8.74875 15.9589C9.33688 15.5226 9.83277 14.9683 10.2064 14.3294C10.5801 13.6906 10.8238 12.9806 10.9227 12.2422C11.0217 11.5039 10.9738 10.7526 10.7821 10.0338C10.5904 9.31503 10.2587 8.64365 9.80725 8.06028C9.35576 7.47691 8.7938 6.99367 8.15535 6.63979C7.51689 6.28591 6.81522 6.06874 6.09274 6.00141Z" fill="#24272C"></path>
          </g>
          <defs>
            <clipPath id="clip0_24000_6160">
              <rect width="24" height="17" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
        
        <blockquote className="text-sm">
          <p>{testimonial.quote}</p>
        </blockquote>
      </div>
      
      <div className="flex flex-row items-center gap-2">
        <Image 
          className="rounded-full" 
          width={32} 
          height={32} 
          alt={testimonial.author}
          src={testimonial.avatar}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{testimonial.author}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{testimonial.handle}</p>
        </div>
      </div>
    </figure>
  );
}

export default function VoicesSection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 py-10 lg:py-20">
      <div 
        style={{ 
          willChange: 'transform, filter, opacity', 
          opacity: 1, 
          filter: 'blur(0px)', 
          transform: 'translateY(0px)' 
        }}
      >
        <div className="flex flex-col gap-6 items-center justify-center px-5">
          <p className="text-primary text-sm font-medium">The Augment Flow Spectrum</p>
          <p className="text-4xl md:text-5xl text-center font-heading font-medium">Voices Across AI Industry</p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:20s]">
          
          {/* First set of testimonials */}
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Third set for seamless loop */}
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`third-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Fourth set for seamless loop */}
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`fourth-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
