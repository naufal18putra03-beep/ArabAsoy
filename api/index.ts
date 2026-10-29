import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Al-Arabiya Kelas 7 API Server is running',
    timestamp: new Date().toISOString(),
  });
});

// AI Arabic Tutor / Ustaz Virtual
app.post('/api/tutor', async (req: Request, res: Response) => {
  try {
    const { question, history, studentName } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Pertanyaan wajib diisi' });
      return;
    }

    const ai = getGeminiClient();
    const systemInstruction = `
Anda adalah "Ustaz Ahmad", seorang guru Bahasa Arab kelas 7 MTs/SMP yang ramah, sabar, bijaksana, dan sangat edukatif.
Fokus kurikulum: Bahasa Arab Kelas 7 (Kemenag / Kurikulum Merdeka):
1. Bab 1: التعارف (At-Ta'aruf / Perkenalan)
2. Bab 2: المرافق المدرسية (Al-Marafiq Al-Madrasiyyah / Fasilitas Sekolah)
3. Bab 3: الأدوات المدرسية (Al-Adawat Al-Madrasiyyah / Peralatan Sekolah)
4. Bab 4: العنوان (Al-'Unwan / Alamat & Angka 1-100)
5. Bab 5: البيت (Al-Bait / Rumah & Ruangan)
6. Bab 6: من يوميات الأسرة (Min Yaumiyyatil Usrah / Keseharian Keluarga)

Aturan Menjawab:
- Tuliskan teks bahasa Arab DENGAN HARAKAT LENGKAP agar mudah dibaca siswa pemula kelas 7.
- Sertakan cara baca (transliterasi latin) dan arti bahasa Indonesia yang jelas.
- Jelaskan kaidah nahwu/sharaf secara sederhana dan menyenangkan (misal perbedaan mudzakkar/muannats, isim isyarah هذا / هذه, dhomir هُوَ / هِيَ / أَنْتَ / أَنْتِ / أَنَا / نَحْنُ).
- Berikan contoh kalimat aplikatif yang relevan untuk anak SMP/MTs.
- Berikan motivasi islami di akhir penjelasan singkat, sapa siswa dengan panggilan ramah seperti "Akhi / Ukhti / Ananda ${studentName || 'Siswa Pintar'}".
    `.trim();

    // Contextual contents
    let contents = question;
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history
        .slice(-6)
        .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Siswa' : 'Ustaz'}: ${h.text}`)
        .join('\n');
      contents = `Riwayat Percakapan Sebelumnya:\n${formattedHistory}\n\nPertanyaan Siswa Sekarang: ${question}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Mohon maaf, Ustaz sedang memproses jawaban. Silakan coba tanyakan kembali ya.';
    res.json({ reply });
  } catch (error) {
    console.error('Tutor API Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Terjadi kendala pada server AI Tutor',
    });
  }
});

// Writing & Translation Checker
app.post('/api/check-writing', async (req: Request, res: Response) => {
  try {
    const { arabicText, taskType, targetMeaning } = req.body;
    if (!arabicText) {
      res.status(400).json({ error: 'Teks bahasa Arab wajib diisi' });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `
Periksa tulisan bahasa Arab berikut yang ditulis oleh siswa Kelas 7:
Teks Siswa: "${arabicText}"
Jenis Tugas: "${taskType || 'Latihan Menulis Kalimat'}"
${targetMeaning ? `Arti yang dimaksud: "${targetMeaning}"` : ''}

Berikan analisis format JSON:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "correctedArabic": "teks arab yang benar dengan harakat lengkap",
  "transliteration": "cara baca latin",
  "meaning": "arti dalam bahasa Indonesia",
  "grammarNotes": "penjelasan singkat nahwu/sharaf untuk siswa kelas 7",
  "encouragement": "kalimat penyemangat guru"
}
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error) {
    console.error('Check Writing API Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Gagal memeriksa tulisan Arab',
    });
  }
});

// Dynamic AI Quiz Generator
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { topic, difficulty, count = 5 } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Buatkan ${count} soal kuis pilihan ganda Bahasa Arab Kelas 7 SMP/MTs tentang materi: "${topic || 'At-Ta\'aruf dan Kosakata Sekolah'}".
Tingkat kesulitan: "${difficulty || 'Sedang'}".

Format kembalian WAJIB JSON array objek dengan struktur:
[
  {
    "id": "q1",
    "question": "Pertanyaan (bisa teks arab berharakat atau pertanyaan bahasa Indonesia)",
    "arabicContext": "Teks kalimat arab pelengkap jika ada (misal: هَذَا ... هُوَ كِتَابٌ)",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctIndex": 0,
    "explanation": "Penjelasan mengapa jawaban tersebut benar"
  }
]
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const questions = JSON.parse(response.text || '[]');
    res.json({ questions });
  } catch (error) {
    console.error('Quiz Generator Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Gagal menghasilkan kuis AI',
    });
  }
});

// Arabic Text to Speech using Gemini 3.8 Flash Lite TTS
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Teks bacaan wajib diisi' });
      return;
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Bacakan teks bahasa Arab berikut dengan makhraj fasih, tartil, dan intonasi edukatif untuk siswa: "${text}"`,
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audioBase64: base64Audio, mimeType: 'audio/wav' });
    } else {
      res.status(404).json({ error: 'Audio tidak dapat dihasilkan' });
    }
  } catch (error) {
    console.error('TTS API Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Gagal memproses suara TTS',
    });
  }
});

export default app;
