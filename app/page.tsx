'use client';

import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { MoodSelector, currentMoods, desiredOutcomes } from './components/MoodSelector';
import { AudioPlayer } from './components/AudioPlayer';
import { WalletConnect } from './components/WalletConnect';
import { Sparkles, Clock, Target } from 'lucide-react';
import { generateMeditationScript, generateMeditationTitle } from '../lib/openai';
import { generateAudioFromText } from '../lib/elevenlabs';
import { createMeditationSession } from '../lib/database';
import { useWallet } from '../lib/hooks/useWallet';

export default function HomePage() {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [desiredOutcome, setDesiredOutcome] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [meditationTitle, setMeditationTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { address, isConnected } = useWallet();

  const handleGenerateMeditation = async () => {
    if (!currentMood || !desiredOutcome) return;
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Generate meditation title
      const title = await generateMeditationTitle(currentMood, desiredOutcome);
      setMeditationTitle(title);

      // Generate meditation script
      const moodLabel = currentMoods.find(m => m.id === currentMood)?.label || '';
      const outcomeLabel = desiredOutcomes.find(o => o.id === desiredOutcome)?.label || '';

      const script = await generateMeditationScript({
        mood: moodLabel,
        outcome: outcomeLabel,
        duration: 15, // 15 minutes default
        userName: 'you', // Could be personalized later
        voice: 'neutral',
      });

      // Generate audio from script
      const audioDataUrl = await generateAudioFromText(script, 'neutral');
      setAudioUrl(audioDataUrl);

      // Save to database
      await createMeditationSession({
        userId: address,
        generated: true,
        type: 'mood-based',
        duration: 15 * 60, // 15 minutes in seconds
        moodTags: [currentMood],
        outcomeTags: [desiredOutcome],
        audioUrl: audioDataUrl,
        script,
      });

      setIsGenerating(false);
      setShowPlayer(true);
    } catch (err) {
      console.error('Error generating meditation:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate meditation');
      setIsGenerating(false);
    }
  };

  const canGenerate = currentMood && desiredOutcome;

  return (
    <AppShell activeTab="home">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full meditation-orb flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-surface/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-surface" />
              </div>
            </div>
          </div>

          <h1 className="text-display font-bold text-text-primary">CalmMind AI</h1>
          <p className="text-body text-text-secondary">Your personal AI guide to tranquility and better sleep</p>

          <WalletConnect />

          {error && (
            <div className="glass-card p-4 border-red-500/20 bg-red-500/10">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
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
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-base ${
                  canGenerate && !isGenerating
                    ? 'btn-primary'
                    : 'bg-surface/40 text-text-secondary cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
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
                <div className="text-caption text-text-secondary">Minutes</div>
              </div>
              <div className="glass-card p-4 text-center">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">100%</div>
                <div className="text-caption text-text-secondary">Personalized</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <AudioPlayer
              title={meditationTitle}
              duration={900} // 15 minutes
              audioUrl={audioUrl}
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
                setAudioUrl('');
                setError('');
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
