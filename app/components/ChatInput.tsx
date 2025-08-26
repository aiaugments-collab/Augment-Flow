'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  return (
    <div className="w-full px-4 transition-all duration-300 ease-in-out pb-4 mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="w-full">
          
          {/* Upgrade Banner */}
          <div className="bg-primary/10 rounded-3xl p-0 w-full">
            <div className="flex items-center justify-center gap-2 h-8 px-3 py-2 rounded-lg w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4 text-primary">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              <Link 
                className="inline-flex cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" 
                href="/pricing"
              >
                <span className="text-xs font-medium text-primary leading-[18px] whitespace-nowrap cursor-pointer hover:underline">Upgrade to PRO</span>
              </Link>
            </div>

            {/* Chat Input Container */}
            <div className="bg-background rounded-3xl border border-border shadow-xl relative z-10">
              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-8">
                
                {/* Text Input */}
                <div className="relative w-full">
                  <div className="relative">
                    <textarea
                      className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content rounded-md border transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm relative z-20 w-full min-h-5 max-h-40 text-sm leading-5 shadow-none font-medium placeholder:text-muted-foreground resize-none border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Talk to Augment Flow... Use / for prompts"
                      rows={1}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={disabled}
                      style={{ padding: '4px', backgroundColor: 'transparent', height: '28px' }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  
                  {/* Left Controls */}
                  <div className="flex items-center gap-2">
                    
                    {/* Mode Selector */}
                    <button
                      type="button"
                      className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground hover:bg-secondary/80 has-[>svg]:px-2.5 h-10 px-4 py-2.5 rounded-[10px] shadow-sm font-medium text-sm gap-2 sm:min-w-24"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target w-4 h-4">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                      <span className="hidden sm:block text-sm">Normal</span>
                    </button>

                    {/* Apps Button */}
                    <button
                      type="button"
                      className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 has-[>svg]:px-2.5 h-10 rounded-lg shadow-sm font-medium text-sm gap-2"
                    >
                      <span className="text-sm">Apps</span>
                      <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-medium">0</span>
                    </button>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    
                    {/* File Upload */}
                    <input
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/heic,image/heif,application/pdf"
                      className="hidden"
                      id="file-upload"
                      type="file"
                    />
                    <label htmlFor="file-upload">
                      <span className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 h-8 w-8 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip h-4 w-4">
                          <path d="M13.234 20.252 21 12.3"></path>
                          <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"></path>
                        </svg>
                      </span>
                    </label>

                    {/* Voice Recording */}
                    <button
                      type="button"
                      onClick={handleVoiceRecord}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 h-10 w-10"
                      title="Start voice recording"
                      aria-label="Start recording"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-mic h-5 w-5 transition-colors ${isRecording ? 'text-red-500' : ''}`}>
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </button>

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={disabled || !message.trim()}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed hover:text-accent-foreground dark:hover:bg-accent/50 size-9 bg-primary/10 hover:bg-primary/20 border-0 shadow-sm"
                      title="Send message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send h-6 w-6 text-primary">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Global Instructions Link */}
          <div className="text-xs text-muted-foreground px-3 pt-2 pb-1 flex flex-row justify-end">
            <span className="text-xs text-muted-foreground px-3 pb-1 cursor-pointer underline hover:text-primary hover:no-underline">
              Global Instructions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
