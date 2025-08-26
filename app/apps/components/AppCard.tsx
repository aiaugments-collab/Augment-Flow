'use client';

import Image from 'next/image';
import { Settings, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { connectGmail, hasGmailConnected } from '../../../lib/connections';

interface App {
  id: string;
  name: string;
  description: string;
  image: string;
  badge: string;
  type: 'core' | 'integration';
}

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkConnectionStatus = useCallback(async () => {
    if (!user || app.type !== 'core') {
      setLoading(false);
      return;
    }

    try {
      if (app.id === 'gmail') {
        const connected = await hasGmailConnected(user.uid);
        setIsConnected(connected);
      } else if (app.id === 'sheets') {
        setIsConnected(false); // Coming soon
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    } finally {
      setLoading(false);
    }
  }, [user, app.type, app.id]);

  useEffect(() => {
    checkConnectionStatus();
  }, [checkConnectionStatus]);

  const handleConnect = async () => {
    if (!user) return;

    if (app.id === 'gmail') {
      setIsConnecting(true);
      try {
        await connectGmail(user);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting Gmail:', error);
        alert('Failed to connect Gmail. Please try again.');
      } finally {
        setIsConnecting(false);
      }
    } else if (app.id === 'sheets') {
      alert('Google Sheets integration is coming soon!');
    }
  };

  const handleConfigure = () => {
    if (app.type === 'integration') {
      console.log(`Configure ${app.name}`);
      alert('External integrations configuration coming soon!');
    } else if (app.type === 'core') {
      if (isConnected && app.id === 'gmail') {
        alert('Gmail is already connected! You can now use it in chat by saying things like "Send an email to..." or "Summarize my recent emails"');
      } else {
        handleConnect();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-full">
          <div className="px-6 w-full h-full">
            <div className="flex flex-col gap-3 h-full">
              {/* App Header */}
              <div className="flex items-start gap-3 w-full">
                <div className="relative flex size-8 shrink-0 overflow-hidden h-10 w-10 rounded-lg">
                  <Image
                    alt={app.name}
                    src={app.image}
                    fill
                    className="object-cover rounded-lg"
                    sizes="40px"
                  />
                </div>
                <div className="flex items-start justify-between w-full min-w-0">
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-medium text-base text-foreground truncate">
                      {app.name}
                    </h3>
                    <span className="inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent bg-amber-500/20 text-amber-400 border-0 text-xs px-2 py-0.5 mt-1 w-fit">
                      {app.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed h-10 overflow-hidden line-clamp-2">
                  {app.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex w-full items-start justify-end">
                {app.type === 'core' ? (
                  <button
                    onClick={handleConfigure}
                    disabled={isConnecting || loading || (app.badge === 'Coming Soon')}
                    className={`cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed gap-1.5 rounded-lg h-8 px-3 ${
                      isConnected 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'
                    }`}
                  >
                    {loading ? (
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                    ) : isConnecting ? (
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                    ) : isConnected ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Settings className="h-4 w-4 mr-2" />
                    )}
                    <span className="text-xs font-semibold">
                      {loading ? 'Loading...' : 
                       isConnecting ? 'Connecting...' : 
                       isConnected ? 'Connected' : 
                       app.badge === 'Coming Soon' ? 'Coming Soon' : 'Connect'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleConfigure}
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 gap-1.5 rounded-lg h-8 px-3"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="text-xs font-semibold">Configure</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
