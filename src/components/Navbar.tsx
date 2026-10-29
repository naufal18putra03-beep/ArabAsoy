import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Sparkles, LogOut, Award, Shield, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'chapters' | 'admin' | 'my-scores';
  setActiveTab: (tab: 'chapters' | 'admin' | 'my-scores') => void;
  onOpenAiTutor: () => void;
  selectedChapterId: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiTutor,
}) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20 text-lg">
              ع
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">
                  Al-Arabiya
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Kelas 7 MTs/SMP
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-arabic">
                تَعَلَّمِ اللُّغَةَ العَرَبِيَّةَ بِسُهُولَةٍ وَمُتْعَةٍ
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'chapters'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Materi</span>
            </button>

            <button
              onClick={() => setActiveTab('my-scores')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'my-scores'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Nilai Saya</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'admin'
                    ? 'bg-purple-100 text-purple-800 font-semibold'
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Panel Guru</span>
              </button>
            )}

            {/* AI Tutor Button */}
            <button
              onClick={onOpenAiTutor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Tanya Ustaz AI</span>
              <span className="sm:hidden">Ustaz AI</span>
            </button>
          </nav>

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-slate-200">
            {user ? (
              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border border-emerald-300 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div className="hidden md:block text-left text-xs leading-tight">
                  <div className="font-semibold text-slate-800 truncate max-w-[120px]">
                    {user.displayName}
                  </div>
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded-sm text-[10px] font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700 font-bold'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {user.role === 'admin' ? 'Guru / Admin' : 'Siswa MTs'}
                  </span>
                </div>

                {/* Mandatory Logout Button */}
                <button
                  onClick={logout}
                  title="Keluar dari akun"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
