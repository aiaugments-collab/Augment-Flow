import Header from './Header';
import Footer from './Footer';
import AppsSection from './AppsSection';
import HowItWorksSection from './HowItWorksSection';
import BackgroundAgentsSection from './BackgroundAgentsSection';
import AgenticAISection from './AgenticAISection';
import VoicesSection from './VoicesSection';
import CTASection from './CTASection';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withBackground?: boolean;
  withFooter?: boolean;
  withAppsSection?: boolean;
  withHowItWorks?: boolean;
  withBackgroundAgents?: boolean;
  withAgenticAI?: boolean;
  withVoices?: boolean;
  withCTA?: boolean;
}

export default function PageContainer({ children, className = '', withBackground = true, withFooter = true, withAppsSection = true, withHowItWorks = true, withBackgroundAgents = true, withAgenticAI = true, withVoices = true, withCTA = true }: PageContainerProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background w-full">
      <p className="hidden relative">Awin</p>
      <main className="flex-1">
        <main className="w-full min-h-[100dvh] bg-card">
          <div className="w-full h-full relative z-10">
            {/* Background gradient - matching the landing page */}
            {withBackground && (
              <div className="absolute inset-0 -z-[10] pointer-events-none">
                <div 
                  className="w-full h-full absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 197, 132, 0.05) 0%, transparent 50%, rgba(0, 197, 132, 0.1) 100%)',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: '0px'
                  }}
                />
              </div>
            )}
            
            {/* Container with header and hero */}
            <div className="container mx-auto px-5 md:px-0 pt-5 lg:pt-10">
              <Header />
              
              {/* Page content */}
              <div className={className}>
                {children}
              </div>
            </div>
          </div>
          
          {/* Full-width Apps Section - outside the container */}
          {withAppsSection && <AppsSection />}
          
          {/* Full-width How It Works Section */}
          {withHowItWorks && <HowItWorksSection />}
          
          {/* Background Agents Section */}
          {withBackgroundAgents && <BackgroundAgentsSection />}
          
          {/* Agentic AI for Everyone Section */}
          {withAgenticAI && <AgenticAISection />}
          
          {/* Voices Across AI Industry Section */}
          {withVoices && <VoicesSection />}
          
          {/* Call to Action Section */}
          {withCTA && <CTASection />}
        </main>
      </main>
      
      {/* Footer */}
      {withFooter && <Footer />}
    </div>
  );
}
