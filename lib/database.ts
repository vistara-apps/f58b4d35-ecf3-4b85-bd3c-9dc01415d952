// Simple in-memory database for demo purposes
// In production, this would be replaced with a real database

interface MeditationSession {
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

interface User {
  userId: string;
  walletAddress: string;
  preferences?: any;
  subscriptionStatus?: string;
  createdAt: Date;
}

// In-memory storage
const meditationSessions: MeditationSession[] = [];
const users: User[] = [];

export async function createMeditationSession(sessionData: Omit<MeditationSession, 'sessionId' | 'createdAt'>): Promise<void> {
  const session: MeditationSession = {
    ...sessionData,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };

  meditationSessions.push(session);
  console.log('Meditation session created:', session);
}

export async function getUserSessions(userId: string): Promise<MeditationSession[]> {
  return meditationSessions.filter(session => session.userId === userId);
}

export async function createUser(userData: Omit<User, 'createdAt'>): Promise<void> {
  const existingUser = users.find(user => user.walletAddress === userData.walletAddress);

  if (!existingUser) {
    const user: User = {
      ...userData,
      createdAt: new Date(),
    };
    users.push(user);
    console.log('User created:', user);
  }
}

export async function getUser(walletAddress: string): Promise<User | null> {
  return users.find(user => user.walletAddress === walletAddress) || null;
}

