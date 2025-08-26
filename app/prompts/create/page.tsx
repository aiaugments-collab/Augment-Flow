'use client';

import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import EnergyDisplay from '../../components/EnergyDisplay';
import ContactTeamButton from '../../components/ContactTeamButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CreatePromptPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    // TODO: Implement actual save functionality
    console.log('Saving prompt:', { title, content });
    
    // Navigate back to prompts page
    router.push('/prompts');
  };

  const handleCancel = () => {
    router.push('/prompts');
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Energy Display */}
        <EnergyDisplay energy={50} />

        {/* Main Content */}
        <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
          <section className="bg-background w-full min-h-[calc(100dvh-64px)] lg:min-h-[100dvh]">
            <div className="container px-4 py-10 md:py-20 lg:px-32 mx-auto w-full h-full flex flex-col items-center md:items-start gap-6 md:gap-8">
              {/* Back Button */}
              <Link href="/prompts">
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 rounded-full">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </Link>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col h-full w-full">
                {/* Header Section with Title Input and Buttons */}
                <div className="mb-8 pb-4 border-b border-border">
                  <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
                    {/* Title Input */}
                    <div className="flex-1 min-w-0 w-full">
                      <input
                        className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 min-w-0 rounded-lg shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-xl md:text-2xl lg:text-3xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-bold bg-transparent border-0 outline-none w-full placeholder:text-muted-foreground/50 text-foreground focus:ring-0"
                        placeholder="Enter prompt title..."
                        maxLength={80}
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ backgroundColor: 'transparent', border: '0px' }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full md:w-auto">
                      <button
                        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-9 px-4 py-2 has-[>svg]:px-3 flex-1"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 flex-1"
                        type="submit"
                        disabled={!isFormValid}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <textarea
                      className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[200px]"
                      id="content"
                      placeholder="Write your prompt here..."
                      rows={10}
                      required
                      maxLength={1000}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* Contact Team Button */}
        <ContactTeamButton />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
