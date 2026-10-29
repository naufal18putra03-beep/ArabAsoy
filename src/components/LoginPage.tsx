import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Sparkles, BookOpen, AlertCircle, KeyRound, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg(null);
      setIsSubmitting(true);
      await loginWithGoogle();
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Gagal masuk dengan Google. Pastikan jendela pop-up diizinkan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await loginAsAdmin(username, password);
      if (!res.success) {
        setErrorMsg(res.message || 'Login gagal.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat memproses login admin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillAdminCredentials = () => {
    setUsername('mulmedlapon');
    setPassword('pakferi123');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Islamic Geometric / Glow Ornaments */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 mb-3 border border-emerald-300/40">
            <span className="font-arabic text-3xl font-bold">ع</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Al-Arabiya Kelas 7
          </h1>
          <p className="font-arabic text-lg text-emerald-300 mt-1 font-semibold">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ
          </p>
          <p className="text-sm text-emerald-100/80 mt-1">
            Media Pembelajaran Bahasa Arab Interaktif MTs & SMP
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 backdrop-blur-sm">
          {/* Tabs: Siswa (Google) vs Guru (Admin) */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setErrorMsg(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Masuk Siswa
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setErrorMsg(null);
              }}
              className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              Guru / Admin
            </button>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Login with Google */}
          {activeTab === 'student' ? (
            <div className="space-y-4">
              <div className="text-center py-2">
                <h3 className="font-bold text-slate-800 text-base">
                  Selamat Datang, Siswa Cerdas!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Masuk dengan akun Google untuk menyimpan nilai kuis dan progres belajar di Firestore.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 rounded-xl font-semibold text-slate-700 shadow-xs hover:shadow-md transition-all cursor-pointer group disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-sm text-slate-800 group-hover:text-emerald-700">
                  {isSubmitting ? 'Menghubungkan...' : 'Masuk dengan Akun Google'}
                </span>
              </button>

              <div className="pt-4 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <BookOpen className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>6 Bab Lengkap</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                    <span>Tutor AI Pintar</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <UserCheck className="w-4 h-4 mx-auto mb-1 text-teal-600" />
                    <span>Kuis Tersimpan</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Admin / Guru Login Form */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="text-center pb-1">
                <h3 className="font-bold text-slate-800 text-base flex items-center justify-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-purple-600" />
                  Portal Khusus Guru / Administrator
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola nilai kuis siswa, pengumuman tugas, dan materi tambahan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username Guru
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: mulmedlapon"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm"
                />
              </div>

              {/* Quick Fill Button */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Akun: mulmedlapon</span>
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className="text-purple-600 hover:text-purple-800 font-semibold hover:underline cursor-pointer"
                >
                  Gunakan Akun Pak Feri
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl font-semibold text-sm shadow-md shadow-purple-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Memeriksa Kredensial...' : 'Masuk sebagai Guru (Pak Feri)'}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-emerald-200/60 mt-6">
          Madrasah Tsanawiyah • Kurikulum Bahasa Arab Kelas 7 • Terintegrasi Firebase & Gemini AI
        </p>
      </div>
    </div>
  );
};
