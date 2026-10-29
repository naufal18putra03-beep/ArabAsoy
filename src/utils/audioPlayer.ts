// Audio pronunciation utility for Arabic vocabulary & dialogs

export async function playArabicAudio(text: string): Promise<void> {
  if (!text) return;

  // 1. First try browser native speech synthesis (instant & zero latency)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any currently playing utterance

    const cleanText = text.replace(/[\n\r]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for language learners

    // Find an Arabic voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    // Try playing
    let played = false;
    utterance.onstart = () => {
      played = true;
    };

    window.speechSynthesis.speak(utterance);

    // If speech synthesis worked, return
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (played || window.speechSynthesis.speaking) {
      return;
    }
  }

  // 2. Fallback to server-side Gemini Flash Lite TTS if speech synthesis is unavailable
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`);
        await audio.play();
      }
    }
  } catch (err) {
    console.warn('TTS playback issue:', err);
  }
}
