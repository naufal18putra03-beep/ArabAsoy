import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { ChapterView } from './components/ChapterView';
import { AdminPanel } from './components/AdminPanel';
import { StudentScoresView } from './components/StudentScoresView';
import { AiTutorModal } from './components/AiTutorModal';
import { CHAPTERS } from './data/chaptersData';
import { getAnnouncements } from './services/firestoreService';
import { Announcement } from './types';
import { Bell, Sparkles, BookOpen, Layers } from 'lucide-react';

const MainApp: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'chapters' | 'admin' | 'my-scores'>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bab-1');
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string | undefined>(undefined);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (user) {
      getAnnouncements()
        .then((data) => setAnnouncements(data))
        .catch((err) => console.log('Announcements note:', err));
    }
  }, [user]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-arabic text-3xl font-bold shadow-xl animate-pulse">
          ع
        </div>
        <h2 className="mt-4 text-xl font-bold tracking-tight">Al-Arabiya Kelas 7</h2>
        <p className="font-arabic text-emerald-400 mt-1">تَحْمِيلُ البَيَانَاتِ...</p>
      </div>
    );
  }

  // Mandatory Login Screen
  if (!user) {
    return <LoginPage />;
  }

  const currentChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];

  const handleOpenAiTutorWithPrompt = (prompt: string) => {
    setAiTutorPrompt(prompt);
    setIsAiTutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navbar with mandatory Logout button */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiTutor={() => {
          setAiTutorPrompt(undefined);
          setIsAiTutorOpen(true);
        }}
        selectedChapterId={selectedChapterId}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Latest Teacher Announcement Banner if available */}
        {announcements.length > 0 && activeTab === 'chapters' && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Pengumuman Guru:
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {announcements[0].title}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                {announcements[0].content}
              </p>
            </div>
          </div>
        )}

        {/* Chapters Navigation Horizontal Slider (when in chapters view) */}
        {activeTab === 'chapters' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Pilih Bab Pembelajaran (Kurikulum Kelas 7 MTs/SMP):</span>
              </div>
              <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                Semester 1 & 2
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {CHAPTERS.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-700 border-emerald-600 text-white shadow-md shadow-emerald-700/20 scale-[1.02]'
                        : 'bg-white border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div>
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                          isSelected
                            ? 'bg-emerald-600 text-emerald-100'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        Bab {ch.number}
                      </span>
                      <p
                        dir="rtl"
                        className={`font-arabic text-lg sm:text-xl font-bold mt-1 truncate ${
                          isSelected ? 'text-white' : 'text-emerald-900'
                        }`}
                      >
                        {ch.titleArabic}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100/20">
                      <p
                        className={`text-xs font-semibold truncate ${
                          isSelected ? 'text-emerald-200' : 'text-slate-600'
                        }`}
                      >
                        {ch.titleLatin}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View Switcher Content */}
        {activeTab === 'chapters' && (
          <ChapterView
            chapter={currentChapter}
            onOpenAiTutorWithPrompt={handleOpenAiTutorWithPrompt}
          />
        )}

        {activeTab === 'my-scores' && (
          <StudentScoresView
            onGoToChapter={(chId) => {
              setSelectedChapterId(chId);
              setActiveTab('chapters');
            }}
          />
        )}

        {activeTab === 'admin' && isAdmin && <AdminPanel />}
      </main>

      {/* Floating AI Tutor Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setAiTutorPrompt(undefined);
            setIsAiTutorOpen(true);
          }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-900/20 border border-emerald-400/30 font-semibold text-sm transition-all hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span className="hidden sm:inline">Tanya Ustaz Ahmad AI</span>
          <span className="sm:hidden font-arabic text-base font-bold">ع</span>
        </button>
      </div>

      {/* AI Tutor Modal */}
      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        initialPrompt={aiTutorPrompt}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Al-Arabiya Kelas 7</span>
            <span>•</span>
            <span>Madrasah Tsanawiyah & SMP</span>
          </div>
          <div>
            Didukung oleh Firebase Auth, Cloud Firestore & Google Gemini 3.8 Flash
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
