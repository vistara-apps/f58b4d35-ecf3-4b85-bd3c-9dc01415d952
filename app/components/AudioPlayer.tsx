'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  duration: number;
  isGenerating?: boolean;
  onPlayComplete?: () => void;
}

export function AudioPlayer({ title, duration, isGenerating = false, onPlayComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isGenerating) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            onPlayComplete?.();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, isGenerating, onPlayComplete]);

  const togglePlayPause = () => {
    if (!isGenerating) {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm">
          {isGenerating ? 'Generating your personalized meditation...' : 'Personalized by CalmMind AI'}
        </p>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-2 meditation-orb">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
              </div>
              <div className="text-sm text-text-secondary">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button 
          className="p-2 rounded-full bg-surface/60 text-text-secondary hover:bg-surface/80 transition-all duration-200"
          onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
          disabled={isGenerating}
        >
          <SkipBack size={20} />
        </button>
        
        <button
          onClick={togglePlayPause}
          disabled={isGenerating}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
            isGenerating 
              ? 'bg-surface/40 text-text-secondary cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </button>
        
        <button 
          className="p-2 rounded-full bg-surface/60 text-text-secondary hover:bg-surface/80 transition-all duration-200"
          onClick={() => setCurrentTime(Math.min(duration, currentTime + 15))}
          disabled={isGenerating}
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Volume2 size={16} className="text-text-secondary" />
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-surface/60 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <span className="text-sm text-text-secondary w-8">{Math.round(volume * 100)}</span>
      </div>
    </div>
  );
}
