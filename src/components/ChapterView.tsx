import React, { useState } from 'react';
import { Chapter } from '../types';
import { MufrodatCard } from './MufrodatCard';
import { InteractiveQuiz } from './InteractiveQuiz';
import { Volume2, BookText, MessageSquareQuote, FileQuestion, Sparkles, Search, Eye, EyeOff } from 'lucide-react';
import { playArabicAudio } from '../utils/audioPlayer';

interface ChapterViewProps {
  chapter: Chapter;
  onOpenAiTutorWithPrompt?: (prompt: string) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  onOpenAiTutorWithPrompt,
}) => {
  const [sectionTab, setSectionTab] = useState<'mufrodat' | 'qawaid' | 'hiwar' | 'qiraah' | 'quiz'>('mufrodat');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQiraahTranslation, setShowQiraahTranslation] = useState(false);
  const [playingHiwarIndex, setPlayingHiwarIndex] = useState<number | null>(null);

  // Filter mufrodat by search
  const filteredMufrodat = chapter.mufrodat.filter(
    (m) =>
      m.arabic.includes(searchQuery) ||
      m.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayHiwar = async (index: number, text: string) => {
    setPlayingHiwarIndex(index);
    try {
      await playArabicAudio(text);
    } finally {
      setTimeout(() => setPlayingHiwarIndex(null), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chapter Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8 shadow-lg shadow-emerald-900/10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3">
              <span>Bab {chapter.number}</span>
              <span>•</span>
              <span>Bahasa Arab Kelas 7</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-arabic text-3xl sm:text-4xl font-bold tracking-wide">
                {chapter.titleArabic}
              </h2>
              <span className="text-xl sm:text-2xl font-bold text-emerald-200">
                ({chapter.titleLatin})
              </span>
            </div>
            <p className="text-base font-semibold text-emerald-100 mt-1">
              {chapter.titleMeaning}
            </p>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl mt-2 leading-relaxed">
              {chapter.description}
            </p>
          </div>

          {/* Quick AI Ask Button */}
          {onOpenAiTutorWithPrompt && (
            <div className="shrink-0">
              <button
                onClick={() =>
                  onOpenAiTutorWithPrompt(`Ustaz, mohon jelaskan ringkasan materi ${chapter.titleLatin} (${chapter.titleArabic}) untuk siswa kelas 7.`)
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Tanya Ustaz Bab Ini</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Sub-Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setSectionTab('mufrodat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            sectionTab === 'mufrodat'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookText className="w-4 h-4" />
          <span>المُفْرَدَاتُ (Kosakata)</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {chapter.mufrodat.length}
          </span>
        </button>

        <button
          onClick={() => setSectionTab('qawaid')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            sectionTab === 'qawaid'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>القَوَاعِدُ (Tata Bahasa)</span>
        </button>

        <button
          onClick={() => setSectionTab('hiwar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            sectionTab === 'hiwar'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>الحِوَارُ (Percakapan)</span>
        </button>

        <button
          onClick={() => setSectionTab('qiraah')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            sectionTab === 'qiraah'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookText className="w-4 h-4" />
          <span>القِرَاءَةُ (Membaca)</span>
        </button>

        <button
          onClick={() => setSectionTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            sectionTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileQuestion className="w-4 h-4" />
          <span>الاِخْتِبَارُ (Kuis Bab)</span>
        </button>
      </div>

      {/* Tab 1: Mufrodat (Kosakata) */}
      {sectionTab === 'mufrodat' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kosakata Arab atau Indonesia..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-xs sm:text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 text-right">
              Menampilkan {filteredMufrodat.length} kosakata • Klik tombol speaker untuk audio
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMufrodat.map((item) => (
              <MufrodatCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Qawa'id (Tata Bahasa) */}
      {sectionTab === 'qawaid' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Kaidah Nahwu & Sharaf Kelas 7
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {chapter.qawaid.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{chapter.qawaid.summary}</p>
          </div>

          <div className="prose prose-emerald max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-2xl border border-slate-100 font-sans">
            {chapter.qawaid.explanation}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">
              Contoh Kalimat Sesuai Kaidah:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {chapter.qawaid.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 text-right flex flex-col justify-between"
                >
                  <p dir="rtl" className="font-arabic text-xl font-bold text-emerald-950 mb-2">
                    {ex.arabic}
                  </p>
                  <div className="text-left pt-2 border-t border-emerald-100 text-xs">
                    <p className="font-semibold text-emerald-700">{ex.latin}</p>
                    <p className="text-slate-700 mt-0.5">{ex.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Hiwar (Percakapan) */}
      {sectionTab === 'hiwar' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Praktek Percakapan (المُحَادَثَةُ)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {chapter.hiwar.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{chapter.hiwar.setting}</p>
            </div>
            <div className="text-xs text-slate-500">
              Dengarkan pelafalan setiap giliran berbicara
            </div>
          </div>

          <div className="space-y-4">
            {chapter.hiwar.dialogs.map((d, idx) => {
              const isEven = idx % 2 === 0;
              const isPlaying = playingHiwarIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    isEven ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`max-w-xl rounded-3xl p-4 sm:p-5 shadow-xs transition-all ${
                      isEven
                        ? 'bg-slate-50 border border-slate-200/80 rounded-tl-sm'
                        : 'bg-emerald-50/70 border border-emerald-200/80 rounded-tr-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isEven
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-emerald-200 text-emerald-800'
                        }`}
                      >
                        {d.speaker} ({d.speakerRole})
                      </span>

                      <button
                        onClick={() => handlePlayHiwar(idx, d.arabic)}
                        title="Dengarkan Suara"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isPlaying
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                      </button>
                    </div>

                    <p
                      dir="rtl"
                      className="font-arabic text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed text-right mb-2"
                    >
                      {d.arabic}
                    </p>

                    <div className="text-left pt-2 border-t border-slate-200/60 text-xs">
                      <p className="font-semibold text-emerald-700">{d.latin}</p>
                      <p className="text-slate-600 mt-0.5 italic">"{d.meaning}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Qira'ah (Membaca) */}
      {sectionTab === 'qiraah' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Latihan Membaca & Memahami Teks
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {chapter.qiraah.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => playArabicAudio(chapter.qiraah.arabicText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Teks</span>
              </button>

              <button
                onClick={() => setShowQiraahTranslation(!showQiraahTranslation)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                {showQiraahTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showQiraahTranslation ? 'Sembunyikan Terjemah' : 'Lihat Terjemah'}</span>
              </button>
            </div>
          </div>

          {/* Arabic Text Display */}
          <div className="p-6 sm:p-8 bg-emerald-50/40 rounded-3xl border border-emerald-100 text-right">
            <p
              dir="rtl"
              className="font-arabic text-2xl sm:text-3xl font-bold text-slate-900 leading-loose tracking-wide"
            >
              {chapter.qiraah.arabicText}
            </p>
          </div>

          {/* Translation Toggle Display */}
          {showQiraahTranslation && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Terjemahan Bahasa Indonesia:
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {chapter.qiraah.indonesianText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Quiz Bab */}
      {sectionTab === 'quiz' && (
        <InteractiveQuiz
          chapterId={chapter.id}
          chapterTitle={chapter.titleLatin}
          questions={chapter.quiz}
        />
      )}
    </div>
  );
};
