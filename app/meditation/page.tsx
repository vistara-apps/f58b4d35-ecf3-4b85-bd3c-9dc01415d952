'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { AudioPlayer } from '../components/AudioPlayer';
import { Play, Clock, Headphones, Moon } from 'lucide-react';

interface MeditationProgram {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'sleep' | 'focus' | 'anxiety' | 'energy';
  icon: React.ReactNode;
  premium?: boolean;
}

const programs: MeditationProgram[] = [
  {
    id: 'deep-sleep',
    title: 'Deep Sleep Journey',
    description: 'Gentle guidance into restful sleep with nature sounds',
    duration: 1800, // 30 minutes
    category: 'sleep',
    icon: <Moon className="w-5 h-5" />,
  },
  {
    id: 'morning-focus',
    title: 'Morning Focus Boost',
    description: 'Start your day with clarity and intention',
    duration: 600, // 10 minutes
    category: 'focus',
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: 'anxiety-relief',
    title: 'Anxiety Relief',
    description: 'Calm your mind and release tension',
    duration: 900, // 15 minutes
    category: 'anxiety',
    icon: <Headphones className="w-5 h-5" />,
  },
  {
    id: 'energy-renewal',
    title: 'Energy Renewal',
    description: 'Revitalize your body and mind',
    duration: 720, // 12 minutes
    category: 'energy',
    icon: <Play className="w-5 h-5" />,
    premium: true,
  },
];

const categories = [
  { id: 'all', label: 'All', color: 'bg-accent' },
  { id: 'sleep', label: 'Sleep', color: 'bg-blue-500' },
  { id: 'focus', label: 'Focus', color: 'bg-green-500' },
  { id: 'anxiety', label: 'Anxiety', color: 'bg-orange-500' },
  { id: 'energy', label: 'Energy', color: 'bg-yellow-500' },
];

export default function MeditationPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<MeditationProgram | null>(null);

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  if (selectedProgram) {
    return (
      <AppShell activeTab="meditation">
        <div className="p-6">
          <button
            onClick={() => setSelectedProgram(null)}
            className="mb-6 text-accent hover:text-accent/80 transition-colors duration-200"
          >
            ← Back to Programs
          </button>
          
          <AudioPlayer
            title={selectedProgram.title}
            duration={selectedProgram.duration}
            onPlayComplete={() => {
              // Handle completion
            }}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeTab="meditation">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Meditation Library</h1>
          <p className="text-text-secondary">Choose from our curated collection</p>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-surface/60 text-text-secondary hover:bg-surface/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              onClick={() => setSelectedProgram(program)}
              className="glass-card p-4 cursor-pointer hover:bg-surface/60 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  {program.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-text-primary">{program.title}</h3>
                    {program.premium && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{program.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-text-secondary flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatDuration(program.duration)}</span>
                    </span>
                  </div>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Play size={16} className="text-accent ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Prompt */}
        <div className="glass-card p-6 text-center space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Unlock Premium Content</h3>
          <p className="text-text-secondary text-sm">
            Get unlimited AI generations, exclusive soundscapes, and advanced analytics
          </p>
          <button className="btn-primary w-full">
            Upgrade to Premium - $9.99/mo
          </button>
        </div>
      </div>
    </AppShell>
  );
}
