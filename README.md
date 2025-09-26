# CalmMind AI - Personalized Meditation App

A Next.js Base Mini App that uses AI to generate personalized meditation sessions based on user mood and desired outcomes.

## Features

- **AI-Generated Mood Meditations**: Personalized 5-30 minute audio meditations based on current mood and desired outcome
- **Customizable Sleep & Relaxation Programs**: Library of guided meditations with customizable background sounds and voices
- **Smart Habit & Progress Tracking**: Track meditation consistency, mood over time, and set personal goals
- **Personalized AI Recommendations**: Data-driven suggestions based on meditation history

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI Integration**: OpenAI GPT-3.5-turbo for meditation script generation
- **Text-to-Speech**: ElevenLabs API for natural-sounding audio
- **Blockchain**: Base network integration for wallet authentication
- **UI Components**: Custom design system with glass-card effects and smooth animations

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vistara-apps/f58b4d35-ecf3-4b85-bd3c-9dc01415d952.git
cd calm-mind-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# ElevenLabs API Configuration
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Base Blockchain Configuration
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

### 4. Get API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env.local` file

#### ElevenLabs API Key
1. Visit [ElevenLabs](https://elevenlabs.io/)
2. Create an account
3. Go to Profile → API Key
4. Copy your API key
5. Add it to your `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### OpenAI Integration

#### `generateMeditationTitle(currentMood, desiredOutcome)`
Generates a calming title for the meditation session.

**Parameters:**
- `currentMood` (string): User's current emotional state
- `desiredOutcome` (string): Desired result from meditation

**Returns:** Promise<string> - Generated title

#### `generateMeditationScript(params)`
Creates a personalized meditation script.

**Parameters:**
```typescript
interface MeditationScriptParams {
  mood: string;        // Current mood label
  outcome: string;     // Desired outcome label
  duration: number;    // Duration in minutes
  userName: string;    // User's name (defaults to 'you')
  voice: string;       // Voice preference
}
```

**Returns:** Promise<string> - Full meditation script

### ElevenLabs Integration

#### `generateAudioFromText(text, voice)`
Converts text to speech using ElevenLabs.

**Parameters:**
- `text` (string): Text to convert to audio
- `voice` (string): Voice ID or name ('neutral', 'calm', 'soothing')

**Returns:** Promise<string> - Data URL of generated audio

### Database Operations

#### `createMeditationSession(sessionData)`
Stores a meditation session in the database.

**Parameters:**
```typescript
interface MeditationSessionData {
  userId: string;
  generated: boolean;
  type: string;
  duration: number;      // Duration in seconds
  moodTags: string[];
  outcomeTags: string[];
  audioUrl: string;
  script?: string;
}
```

#### `getUserSessions(userId)`
Retrieves all meditation sessions for a user.

**Parameters:**
- `userId` (string): User's wallet address

**Returns:** Promise<MeditationSession[]>

## Design System

### Colors
- **Background**: `hsl(210, 30%, 95%)`
- **Accent**: `hsl(280, 60%, 70%)`
- **Primary**: `hsl(190, 80%, 50%)`
- **Surface**: `hsl(210, 30%, 100%)`
- **Text Primary**: `hsl(210, 30%, 20%)`
- **Text Secondary**: `hsl(210, 30%, 50%)`

### Typography
- **Display**: `text-4xl font-bold`
- **Heading**: `text-2xl font-semibold`
- **Body**: `text-base leading-7 font-normal`
- **Caption**: `text-sm font-medium`

### Components
- **AppShell**: Main layout with navigation
- **Button**: Primary, secondary, outline, and destructive variants
- **Card**: Default and elevated variants with glass effect
- **ProgressCircle**: Circular progress indicator with label
- **MoodSelector**: Interactive mood and outcome selection
- **AudioPlayer**: Full-featured audio player with controls

## User Flows

### Onboarding & First Meditation
1. User connects Base wallet
2. App displays welcome and explains AI meditation feature
3. User selects current mood and desired outcome
4. User optionally selects voice and background preferences
5. AI generates and plays personalized meditation
6. User can save session or try another
7. User is prompted to sign up for free trial

### Progress Tracking & Goal Setting
1. User navigates to Progress tab
2. App displays current meditation streak, mood trends, session history
3. User can view achievements and milestones
4. User can set new goals for meditation frequency or mood improvement
5. App provides visual feedback on goal progress

### Subscription Upgrade
1. User attempts premium feature access
2. App displays upgrade prompt with benefits
3. User clicks "Upgrade to Premium"
4. App shows pricing options ($9.99/mo)
5. User confirms via wallet transaction
6. Account upgrades instantly

## Business Model

### Subscription Tiers
- **Free Tier**: Limited AI meditations, basic tracking
- **Premium Tier**: $9.99/month
  - Unlimited AI generation
  - Full soundscape library
  - Advanced analytics
  - Personalized voice options

### Monetization Options
- Freemium with one-time purchases
- Tokenized access for crypto-native users
- Subscription ensures recurring revenue for AI development

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all API keys are properly configured in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

