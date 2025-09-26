export interface User {
  userId: string;
  walletAddress?: string;
  preferences: UserPreferences;
  subscriptionStatus: 'free' | 'premium';
  createdAt: Date;
}

export interface UserPreferences {
  voiceType: 'male' | 'female';
  backgroundSounds: string[];
  defaultDuration: number;
  notifications: boolean;
  sleepMode: boolean;
  volume: number;
}

export interface MeditationSession {
  sessionId: string;
  userId: string;
  generated: boolean;
  type: string;
  duration: number;
  moodTags: string[];
  outcomeTags: string[];
  audioUrl?: string;
  createdAt: Date;
}

export interface Goal {
  goalId: string;
  userId: string;
  metric: 'sessions_per_week' | 'minutes_per_day' | 'streak_days';
  targetValue: number;
  startDate: Date;
  endDate: Date;
}

export interface ProgressLog {
  logId: string;
  userId: string;
  date: Date;
  meditationMinutes: number;
  moodScore: number; // 1-10 scale
  notes?: string;
}

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export type Theme = 'default' | 'celo' | 'solana' | 'base' | 'coinbase';
