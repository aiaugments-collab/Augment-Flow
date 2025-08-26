'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import EnergyDisplay from '../components/EnergyDisplay';
import ChatInput from '../components/ChatInput';
import ContactTeamButton from '../components/ContactTeamButton';
import ProtectedRoute from '../components/ProtectedRoute';

export default function DashboardPage() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'ai' }>>([]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const
    };
    setMessages(prev => [...prev, newMessage]);
    
    // TODO: Implement AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${message}". This is a placeholder response.`,
        sender: 'ai' as const
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
      {/* Energy Display */}
      <EnergyDisplay energy={50} />

      {/* Main Chat Area */}
      <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
        <div className="w-full bg-background overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ease-in-out min-h-[calc(100dvh-64px)] lg:min-h-[100dvh] py-20" id="chat-scroll-container">
          
          <div className="w-full transition-all duration-300 ease-in-out">
            <div className="flex flex-col h-full w-full relative">
              
              {/* Chat Messages Area */}
              <div className="flex flex-col items-center justify-center space-y-10 px-4 max-w-4xl mx-auto h-full">
                {messages.length === 0 ? (
                  <p className="text-4xl font-heading py-1 sm:py-2 font-semibold text-foreground text-center">
                    Just talk to <span className="text-primary">Augment Flow</span>
                  </p>
                ) : (
                  <div className="w-full max-w-3xl mx-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Messages Container */}
              <div className="flex-1">
                <div className="h-full flex flex-col overflow-hidden w-full">
                  <div className="w-full relative flex-1 overflow-hidden">
                    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
                      <div className="w-full min-h-full max-w-3xl mx-auto pb-4 px-2"></div>
                    </div>
                    
                    {/* Gradient Overlays */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>

      {/* Contact Team Button */}
      <ContactTeamButton />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
