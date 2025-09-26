'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  duration: number;
  audioUrl?: string;
  isGenerating?: boolean;
  onPlayComplete?: () => void;
}

export function AudioPlayer({ title, duration, audioUrl, isGenerating = false, onPlayComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [audioDuration, setAudioDuration] = useState(duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && audioUrl) {
      // Use real audio element
      const handleLoadedMetadata = () => {
        setAudioDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        onPlayComplete?.();
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    } else if (!audioUrl) {
      // Fallback to simulated playback
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
    }
  }, [isPlaying, duration, isGenerating, onPlayComplete, audioUrl]);

  const togglePlayPause = async () => {
    if (!isGenerating) {
      const audio = audioRef.current;

      if (audio && audioUrl) {
        // Use real audio element
        if (isPlaying) {
          audio.pause();
        } else {
          try {
            await audio.play();
          } catch (error) {
            console.error('Error playing audio:', error);
          }
        }
      } else {
        // Fallback to simulated playback
        setIsPlaying(!isPlaying);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

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
              stroke="hsl(210, 30%, 80%)"
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
              className="transition-all duration-base"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(280, 60%, 70%)" />
                <stop offset="100%" stopColor="hsl(190, 80%, 50%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-2 meditation-orb">
                <div className="w-8 h-8 rounded-full bg-surface/20"></div>
              </div>
              <div className="text-sm text-text-secondary">
                {formatTime(currentTime)} / {formatTime(audioDuration)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          className="p-2 rounded-full bg-surface text-text-secondary hover:bg-surface/80 transition-all duration-base"
          onClick={() => {
            const audio = audioRef.current;
            if (audio && audioUrl) {
              audio.currentTime = Math.max(0, audio.currentTime - 15);
            } else {
              setCurrentTime(Math.max(0, currentTime - 15));
            }
          }}
          disabled={isGenerating}
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={isGenerating}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-base ${
            isGenerating
              ? 'bg-surface/40 text-text-secondary cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </button>

        <button
          className="p-2 rounded-full bg-surface text-text-secondary hover:bg-surface/80 transition-all duration-base"
          onClick={() => {
            const audio = audioRef.current;
            if (audio && audioUrl) {
              audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
            } else {
              setCurrentTime(Math.min(audioDuration, currentTime + 15));
            }
          }}
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
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <span className="text-sm text-text-secondary w-8">{Math.round(volume * 100)}</span>
      </div>

      {/* Hidden audio element for real playback */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
