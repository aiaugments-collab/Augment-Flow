'use client';

import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import DashboardLayout from '../../components/DashboardLayout';
import EnergyDisplay from '../../components/EnergyDisplay';
import ContactTeamButton from '../../components/ContactTeamButton';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Save, Plus, Clock, Calendar, RefreshCw } from 'lucide-react';

type ScheduleType = 'one-time' | 'recurring' | null;

interface AgentSection {
  id: string;
  name: string;
  content: string;
}

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [scheduleType, setScheduleType] = useState<ScheduleType>(null);
  const [sections, setSections] = useState<AgentSection[]>([]);
  const router = useRouter();

  const handleBack = () => {
    router.push('/agents');
  };

  const handleTest = () => {
    // TODO: Implement test functionality
    console.log('Testing agent...');
  };

  const handleSave = () => {
    if (!agentName.trim() || !instructions.trim()) return;
    
    // TODO: Implement actual save functionality
    console.log('Saving agent:', {
      name: agentName,
      instructions,
      scheduleType,
      sections
    });
    
    router.push('/agents');
  };

  const handleAddSection = () => {
    const newSection: AgentSection = {
      id: Date.now().toString(),
      name: 'New Section',
      content: ''
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, field: 'name' | 'content', value: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const isFormValid = agentName.trim().length > 0 && instructions.trim().length > 0;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Energy Display */}
        <EnergyDisplay energy={50} />

        {/* Main Content */}
        <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
          <div className="w-full h-[100dvh] max-h-[100dvh] overflow-y-auto">
            <div className="w-full min-h-[calc(100dvh-64px)] lg:min-h-[100dvh] bg-background pb-10">
              <div className="w-full mx-auto max-w-7xl">
                {/* Back Button */}
                <div className="w-full py-4 px-2 lg:py-6">
                  <button 
                    onClick={handleBack}
                    className="group flex flex-row cursor-pointer w-fit h-10 py-2 transition-colors"
                  >
                    <ArrowLeft className="size-5 text-secondary-foreground group-hover:text-primary transition-colors" />
                    <span className="ml-2 text-sm font-medium text-secondary-foreground group-hover:text-primary hidden sm:inline transition-colors">
                      back
                    </span>
                  </button>
                </div>

                <div className="flex flex-col h-full p-2">
                  {/* Header Section with Agent Name and Actions */}
                  <div className="mb-8 pb-4 border-b border-border">
                    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
                      {/* Agent Name Input */}
                      <div className="flex-1 min-w-0">
                        <input
                          className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 min-w-0 rounded-lg shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-xl md:text-2xl lg:text-3xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-bold bg-transparent border-0 outline-none w-full placeholder:text-muted-foreground/50 text-foreground focus:ring-0"
                          placeholder="Enter agent name..."
                          maxLength={80}
                          type="text"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          style={{ backgroundColor: 'transparent', border: '0px' }}
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                        <button
                          onClick={handleTest}
                          disabled={!isFormValid}
                          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Test
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={!isFormValid}
                          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-8">
                    <div className="space-y-8">
                      <div className="space-y-8 pb-10">
                        {/* Instructions Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 w-full">
                              <div className="flex items-center gap-2 w-full">
                                <h3 className="text-lg font-medium text-foreground select-none cursor-pointer hover:text-primary" title="Click to edit section name">
                                  Instructions
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-center gap-3"></div>
                          </div>
                          <div className="relative">
                            <textarea
                              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content bg-transparent px-3 shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full resize-none tracking-wide border-1 py-4 rounded-md transition-all duration-200 placeholder:text-muted-foreground/60 min-h-[200px] text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Describe what this agent should do..."
                              value={instructions}
                              onChange={(e) => setInstructions(e.target.value)}
                              style={{ minHeight: '0px', fontSize: '1rem', lineHeight: '1.65' }}
                            />
                          </div>
                        </div>

                        {/* Dynamic Sections */}
                        {sections.map((section) => (
                          <div key={section.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 w-full">
                                <div className="flex items-center gap-2 w-full">
                                  <input
                                    className="text-lg font-medium text-foreground select-none cursor-pointer hover:text-primary bg-transparent border-0 outline-none"
                                    value={section.name}
                                    onChange={(e) => updateSection(section.id, 'name', e.target.value)}
                                    placeholder="Section name..."
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => removeSection(section.id)}
                                className="text-muted-foreground hover:text-destructive text-sm"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="relative">
                              <textarea
                                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content bg-transparent px-3 shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full resize-none tracking-wide border-1 py-4 rounded-md transition-all duration-200 placeholder:text-muted-foreground/60 min-h-[200px] text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder="Enter section content..."
                                value={section.content}
                                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                                style={{ minHeight: '0px', fontSize: '1rem', lineHeight: '1.65' }}
                              />
                            </div>
                          </div>
                        ))}

                        {/* Add Section Button */}
                        <div className="flex justify-center pt-4 pb-10">
                          <button
                            onClick={handleAddSection}
                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed hover:bg-accent dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 text-muted-foreground hover:text-primary h-8 px-3 border border-dashed border-muted-foreground/30 hover:border-primary/50"
                            type="button"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Section
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="mt-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Schedule</h3>
                          <p className="text-sm text-muted-foreground">When should your agent run?</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* One Time Button */}
                            <button
                              onClick={() => setScheduleType('one-time')}
                              className={`cursor-pointer inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 has-[>svg]:px-3 h-20 p-4 rounded-lg border-2 transition-all duration-200 justify-start relative ${
                                scheduleType === 'one-time'
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-background border-border text-muted-foreground hover:border-border/80 hover:bg-muted/50'
                              }`}
                              type="button"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${scheduleType === 'one-time' ? 'bg-primary/20' : 'bg-muted-foreground/10'}`}>
                                  <Calendar className={`h-5 w-5 ${scheduleType === 'one-time' ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-medium text-foreground/80">One Time</div>
                                  <div className="text-xs text-muted-foreground">Run only</div>
                                </div>
                              </div>
                            </button>

                            {/* Recurring Button */}
                            <button
                              onClick={() => setScheduleType('recurring')}
                              className={`cursor-pointer inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 has-[>svg]:px-3 h-20 p-4 rounded-lg border-2 transition-all duration-200 justify-start relative ${
                                scheduleType === 'recurring'
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-background border-border text-muted-foreground hover:border-border/80 hover:bg-muted/50'
                              }`}
                              type="button"
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${scheduleType === 'recurring' ? 'bg-primary/20' : 'bg-muted-foreground/10'}`}>
                                  <RefreshCw className={`h-5 w-5 ${scheduleType === 'recurring' ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-medium text-foreground/80">Recurring</div>
                                  <div className="text-xs text-muted-foreground">Repeat automatically</div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Contact Team Button */}
        <ContactTeamButton />
      </DashboardLayout>
    </ProtectedRoute>
  );
}