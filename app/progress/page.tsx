'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { ProgressCircle } from '../components/ProgressCircle';
import { WalletConnect } from '../components/WalletConnect';
import { useWallet } from '../../lib/hooks/useWallet';
import { getUserSessions } from '../../lib/database';
import { MeditationSession } from '../../lib/types';
import { Calendar, Target, TrendingUp, Clock, Award } from 'lucide-react';

export default function ProgressPage() {
  const { address, isConnected } = useWallet();
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadUserProgress();
    }
  }, [isConnected, address]);

  const loadUserProgress = async () => {
    if (!address) return;

    setLoading(true);
    try {
      const userSessions = await getUserSessions(address);
      setSessions(userSessions);
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalMinutes = sessions.reduce((sum, session) => sum + (session.duration / 60), 0);
  const totalSessions = sessions.length;
  const averageSessionLength = totalSessions > 0 ? totalMinutes / totalSessions : 0;

  // Calculate streak (simplified - consecutive days with sessions)
  const getCurrentStreak = () => {
    if (sessions.length === 0) return 0;

    const sortedSessions = sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    let streak = 0;
    let currentDate = new Date();

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.createdAt);
      const diffTime = currentDate.getTime() - sessionDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0 || diffDays === 1) {
        streak++;
        currentDate = sessionDate;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = getCurrentStreak();

  return (
    <AppShell activeTab="progress">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-display font-bold text-text-primary">Your Progress</h1>
          <p className="text-body text-text-secondary">Track your meditation journey and achievements</p>

          <WalletConnect />
        </div>

        {!isConnected ? (
          <div className="text-center py-12">
            <p className="text-body text-text-secondary">Connect your wallet to view your meditation progress</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 text-center">
                <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{Math.round(totalMinutes)}</div>
                <div className="text-caption text-text-secondary">Total Minutes</div>
              </div>

              <div className="glass-card p-4 text-center">
                <Target className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{totalSessions}</div>
                <div className="text-caption text-text-secondary">Sessions</div>
              </div>

              <div className="glass-card p-4 text-center">
                <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{Math.round(averageSessionLength)}</div>
                <div className="text-caption text-text-secondary">Avg Minutes</div>
              </div>

              <div className="glass-card p-4 text-center">
                <Award className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-text-primary">{currentStreak}</div>
                <div className="text-caption text-text-secondary">Day Streak</div>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="glass-card p-6">
              <h2 className="text-heading font-semibold text-text-primary mb-4">Weekly Goal Progress</h2>
              <div className="flex justify-center">
                <ProgressCircle
                  value={Math.min(totalMinutes, 60)} // Example: 60 minutes weekly goal
                  max={60}
                  size={150}
                  label="Weekly Goal"
                  showValue={true}
                />
              </div>
              <p className="text-center text-caption text-text-secondary mt-4">
                {Math.round(totalMinutes)} of 60 minutes this week
              </p>
            </div>

            {/* Recent Sessions */}
            <div className="glass-card p-6">
              <h2 className="text-heading font-semibold text-text-primary mb-4">Recent Sessions</h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-body text-text-secondary">Loading your sessions...</p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-body text-text-secondary">No meditation sessions yet</p>
                  <p className="text-caption text-text-secondary">Start your journey by creating your first AI meditation!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session.sessionId} className="flex items-center justify-between p-3 bg-surface/20 rounded-lg">
                      <div>
                        <p className="text-body font-medium text-text-primary">
                          {session.type === 'mood-based' ? 'AI Generated Meditation' : 'Custom Session'}
                        </p>
                        <p className="text-caption text-text-secondary">
                          {new Date(session.createdAt).toLocaleDateString()} • {Math.round(session.duration / 60)} minutes
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {session.moodTags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

