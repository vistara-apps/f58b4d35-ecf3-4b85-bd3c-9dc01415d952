export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      '5 AI meditations per month',
      'Basic progress tracking',
      'Limited soundscape library',
    ],
    limits: {
      aiGenerations: 5,
      premiumContent: false,
    },
  },
  PREMIUM: {
    name: 'Premium',
    price: 9.99,
    features: [
      'Unlimited AI meditations',
      'Full soundscape library',
      'Advanced analytics',
      'Personalized voice options',
      'Priority support',
    ],
    limits: {
      aiGenerations: -1, // unlimited
      premiumContent: true,
    },
  },
} as const;

export const MEDITATION_CATEGORIES = [
  'sleep',
  'focus',
  'anxiety',
  'energy',
  'stress',
  'confidence',
] as const;

export const VOICE_OPTIONS = [
  { id: 'sarah', name: 'Sarah', gender: 'female', accent: 'american' },
  { id: 'james', name: 'James', gender: 'male', accent: 'british' },
  { id: 'maria', name: 'Maria', gender: 'female', accent: 'spanish' },
  { id: 'david', name: 'David', gender: 'male', accent: 'american' },
] as const;

export const BACKGROUND_SOUNDS = [
  { id: 'rain', name: 'Rain', category: 'nature' },
  { id: 'ocean', name: 'Ocean Waves', category: 'nature' },
  { id: 'forest', name: 'Forest', category: 'nature' },
  { id: 'fire', name: 'Crackling Fire', category: 'ambient' },
  { id: 'bells', name: 'Tibetan Bells', category: 'spiritual' },
  { id: 'silence', name: 'Silence', category: 'minimal' },
] as const;

export const DURATION_OPTIONS = [
  { value: 300, label: '5 minutes' },
  { value: 600, label: '10 minutes' },
  { value: 900, label: '15 minutes' },
  { value: 1200, label: '20 minutes' },
  { value: 1800, label: '30 minutes' },
] as const;
