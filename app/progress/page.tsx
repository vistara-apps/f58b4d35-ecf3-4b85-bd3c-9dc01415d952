'use client';

import { AppShell } from '../components/AppShell';
import { ProgressCircle } from '../components/ProgressCircle';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';

export default function ProgressPage() {
  // Mock data - in real app, this would come from user's meditation history
  const stats = {
    currentStreak: 7,
    totalSessions: 42,
    totalMinutes: 630,
    weeklyGoal: 5,
    completedThisWeek: 4,
    moodImprovement: 85,
  };

  const recentSessions = [
    { date: '2024-01-15', duration: 15, mood: 'Calm', type: 'Sleep Meditation' },
    { date: '2024-01-14', duration: 10, mood: 'Focused', type: 'Morning Focus' },
    { date: '2024-01-13', duration: 20, mood: 'Relaxed', type: 'Anxiety Relief' },
    { date: '2024-01-12', duration: 12, mood: 'Energized', type: 'Energy Renewal' },
  ];

  const achievements = [
    { id: 1, title: 'First Week', description: '7 day streak', earned: true },
    { id: 2, title: 'Early Bird', description: '5 morning sessions', earned: true },
    { id: 3, title: 'Night Owl', description: '10 sleep sessions', earned: false },
    { id: 4, title: 'Zen Master', description: '50 total sessions', earned: false },
  ];

  return (
    <AppShell activeTab="progress">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Your Progress</h1>
          <p className="text-text-secondary">Track your mindfulness journey</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">{stats.currentStreak}</div>
            <div className="text-sm text-text-secondary">Day Streak</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">{stats.totalSessions}</div>
            <div className="text-sm text-text-secondary">Total Sessions</div>
          </div>
        </div>

        {/* Progress Circles */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <ProgressCircle
              value={stats.completedThisWeek}
              max={stats.weeklyGoal}
              label="Weekly Goal"
              color="#8B5CF6"
            />
          </div>
          <div className="text-center">
            <ProgressCircle
              value={stats.moodImprovement}
              max={100}
              label="Mood Improvement"
              color="#3B82F6"
            />
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Calendar size={20} />
            <span>Recent Sessions</span>
          </h2>
          
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-primary">{session.type}</div>
                    <div className="text-sm text-text-secondary">{session.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent font-medium">{session.duration} min</div>
                    <div className="text-sm text-text-secondary">{session.mood}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Award size={20} />
            <span>Achievements</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`glass-card p-4 text-center ${
                  achievement.earned ? 'border-accent/50' : 'opacity-60'
                }`}
              >
                <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-accent text-white' : 'bg-surface/60 text-text-secondary'
                }`}>
                  <Award size={16} />
                </div>
                <div className="text-sm font-medium text-text-primary">{achievement.title}</div>
                <div className="text-xs text-text-secondary">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Setting */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Target size={20} />
            <span>Set New Goal</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Weekly Meditation Goal
              </label>
              <select className="w-full p-3 bg-surface/60 border border-white/10 rounded-lg text-text-primary">
                <option value="3">3 sessions per week</option>
                <option value="5" selected>5 sessions per week</option>
                <option value="7">7 sessions per week (Daily)</option>
              </select>
            </div>
            
            <button className="w-full btn-primary">
              Update Goal
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
