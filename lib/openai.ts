import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for client-side usage
});

export interface MeditationScriptParams {
  mood: string;
  outcome: string;
  duration: number;
  userName: string;
  voice: string;
}

export async function generateMeditationTitle(currentMood: string, desiredOutcome: string): Promise<string> {
  try {
    const prompt = `Create a short, calming title for a meditation session. The user is feeling "${currentMood}" and wants to achieve "${desiredOutcome}". Make it 3-7 words long and peaceful.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || 'Peaceful Meditation';
  } catch (error) {
    console.error('Error generating meditation title:', error);
    return 'Peaceful Meditation';
  }
}

export async function generateMeditationScript(params: MeditationScriptParams): Promise<string> {
  try {
    const { mood, outcome, duration, userName, voice } = params;

    const prompt = `Create a personalized meditation script for someone who is feeling "${mood}" and wants to achieve "${outcome}". The meditation should be approximately ${duration} minutes long.

Key requirements:
- Start with a gentle introduction addressing the user by name: "${userName}"
- Guide through breathing exercises and mindfulness
- Include positive affirmations related to their desired outcome
- Use calming, supportive language
- End with a peaceful close
- Keep the script natural and conversational
- Focus on helping them transition from their current mood to their desired state

Please write the full meditation script:`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || 'Take a deep breath and relax...';
  } catch (error) {
    console.error('Error generating meditation script:', error);
    return 'Take a deep breath and relax...';
  }
}

