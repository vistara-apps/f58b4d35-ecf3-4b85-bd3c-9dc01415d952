const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

export async function generateAudioFromText(text: string, voice: string = 'neutral'): Promise<string> {
  try {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Map voice names to ElevenLabs voice IDs
    const voiceIds: { [key: string]: string } = {
      neutral: '21m00Tcm4TlvDq8ikWAM', // Rachel (calm, professional)
      calm: 'AZnzlk1XvdvUeBnXmlld', // Dora (calm, gentle)
      soothing: 'EXAVITQu4vr4xnSDxMaL', // Bella (soothing, warm)
    };

    const voiceId = voiceIds[voice] || voiceIds.neutral;

    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ElevenLabs API error: ${errorData.detail || response.statusText}`);
    }

    const audioBlob = await response.blob();

    // Convert blob to data URL for client-side usage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(audioBlob);
    });
  } catch (error) {
    console.error('Error generating audio from text:', error);
    throw error;
  }
}

