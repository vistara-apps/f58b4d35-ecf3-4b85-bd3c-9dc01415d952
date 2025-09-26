'use client';

import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { MoodSelector, currentMoods, desiredOutcomes } from './components/MoodSelector';
import { AudioPlayer } from './components/AudioPlayer';
import { WalletConnect } from './components/WalletConnect';
import { Sparkles, Clock, Target } from 'lucide-react';

export default function HomePage() {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [desiredOutcome, setDesiredOutcome] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [meditationTitle, setMeditationTitle] = useState('');

  const handleGenerateMeditation = async () => {
    if (!currentMood || !desiredOutcome) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    const moodLabel = currentMoods.find(m => m.id === currentMood)?.label || '';
    const outcomeLabel = desiredOutcomes.find(o => o.id === desiredOutcome)?.label || '';
    
    setMeditationTitle(`${moodLabel} to ${outcomeLabel} Meditation`);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowPlayer(true);
    }, 3000);
  };

  const canGenerate = currentMood && desiredOutcome;

  return (
    <AppShell activeTab="home">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full meditation-orb flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-text-primary">CalmMind AI</h1>
          <p className="text-text-secondary">Your personal AI guide to tranquility and better sleep</p>
          
          <WalletConnect />
        </div>

        {!showPlayer ? (
          <div className="space-y-8">
            {/* Mood Selection */}
            <MoodSelector
              title="How are you feeling right now?"
              options={currentMoods}
              selectedMood={currentMood}
              onMoodSelect={setCurrentMood}
            />

            {/* Desired Outcome Selection */}
            <MoodSelector
              title="What would you like to achieve?"
              options={desiredOutcomes}
              selectedMood={desiredOutcome}
              onMoodSelect={setDesiredOutcome}
            />

            {/* Generate Button */}
            <div className="pt-4">
              <button
                onClick={handleGenerateMeditation}
                disabled={!canGenerate || isGenerating}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  canGenerate && !isGenerating
                    ? 'btn-primary'
                    : 'bg-surface/40 text-text-secondary cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Your Meditation...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles size={20} />
                    <span>Generate AI Meditation</span>
                  </div>
                )}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-4 text-center">
                <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">5-30</div>
                <div className="text-sm text-text-secondary">Minutes</div>
              </div>
              <div className="glass-card p-4 text-center">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">100%</div>
                <div className="text-sm text-text-secondary">Personalized</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <AudioPlayer
              title={meditationTitle}
              duration={900} // 15 minutes
              isGenerating={isGenerating}
              onPlayComplete={() => {
                // Handle completion - could show progress update, etc.
              }}
            />
            
            <button
              onClick={() => {
                setShowPlayer(false);
                setCurrentMood('');
                setDesiredOutcome('');
                setMeditationTitle('');
              }}
              className="w-full btn-secondary"
            >
              Create Another Meditation
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
