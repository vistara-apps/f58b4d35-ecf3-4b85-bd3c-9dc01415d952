import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function calculateStreak(sessions: { date: Date }[]): number {
  if (sessions.length === 0) return 0;
  
  const sortedSessions = sessions
    .map(s => new Date(s.date.toDateString()))
    .sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const sessionDate of sortedSessions) {
    const daysDiff = Math.floor(
      (currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff === streak + 1) {
      // Allow for one day gap if today hasn't been completed yet
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function generateMeditationPrompt(
  currentMood: string,
  desiredOutcome: string,
  duration: number,
  userName?: string
): string {
  const durationMinutes = Math.floor(duration / 60);
  
  return `Create a ${durationMinutes}-minute guided meditation script for someone who is currently feeling ${currentMood} and wants to achieve ${desiredOutcome}. 
  
  ${userName ? `Address the person as ${userName} occasionally throughout the meditation.` : ''}
  
  Structure the meditation with:
  1. A gentle introduction and breathing exercise (2-3 minutes)
  2. Main meditation content focused on transitioning from ${currentMood} to ${desiredOutcome} (${durationMinutes - 4} minutes)
  3. A peaceful conclusion and return to awareness (1-2 minutes)
  
  Use calming, supportive language and include specific breathing techniques, visualization exercises, and mindfulness practices appropriate for this emotional transition.`;
}

export function getMoodColor(mood: string): string {
  const moodColors: Record<string, string> = {
    stressed: '#ef4444', // red
    anxious: '#f97316', // orange
    unfocused: '#eab308', // yellow
    tired: '#3b82f6', // blue
    restless: '#8b5cf6', // purple
    overwhelmed: '#ec4899', // pink
    calm: '#10b981', // green
    focus: '#3b82f6', // blue
    sleep: '#6366f1', // indigo
    energy: '#eab308', // yellow
    confidence: '#f97316', // orange
    peace: '#8b5cf6', // purple
  };
  
  return moodColors[mood] || '#6b7280'; // default gray
}
