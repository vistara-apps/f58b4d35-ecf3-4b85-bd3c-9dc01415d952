export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface OutcomeOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface MeditationSession {
  sessionId: string;
  userId: string;
  generated: boolean;
  type: string;
  duration: number;
  moodTags: string[];
  outcomeTags: string[];
  audioUrl: string;
  script?: string;
  createdAt: Date;
}

export interface User {
  userId: string;
  walletAddress: string;
  preferences?: any;
  subscriptionStatus?: string;
  createdAt: Date;
}

export interface Goal {
  goalId: string;
  userId: string;
  metric: string;
  targetValue: number;
  startDate: Date;
  endDate: Date;
}

export interface ProgressLog {
  logId: string;
  userId: string;
  date: Date;
  meditationMinutes: number;
  moodScore: number;
  notes?: string;
}

