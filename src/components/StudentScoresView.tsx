import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, Clock, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { QuizSubmissionRecord } from '../types';
import { getStudentQuizResults } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';

interface StudentScoresViewProps {
  onGoToChapter: (chapterId: string) => void;
}

export const StudentScoresView: React.FC<StudentScoresViewProps> = ({ onGoToChapter }) => {
  const { user } = useAuth();
  const [results, setResults] = useState<QuizSubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getStudentQuizResults(user.uid);
      setResults(data);
    } catch (err) {
      console.error('Error fetching student scores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [user]);

  const totalQuizzes = results.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(results.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalQuizzes)
      : 0;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Buku Rekap Nilai Siswa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prestasi & Nilai Kuis Saya
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
              Semua nilai kuis yang telah kamu kerjakan tersimpan aman di database Firestore.
            </p>
          </div>

          <button
            onClick={fetchResults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Nilai</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200">Kuis Diselesaikan</span>
            <div className="text-xl sm:text-2xl font-bold mt-0.5">{totalQuizzes} Kali</div>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200">Rata-rata Nilai</span>
            <div className="text-xl sm:text-2xl font-bold mt-0.5 text-amber-300">
              {avgScore}%
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-emerald-200">Status Belajar</span>
            <div className="text-sm font-bold mt-1 text-emerald-100">
              {avgScore >= 80 ? '🌟 Sangat Aktif' : avgScore >= 60 ? '👍 Terus Tingkatkan' : '📚 Mulai Kuis'}
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-4">Riwayat Kuis Tersimpan</h3>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
            Memuat nilai kuis kamu dari Firestore...
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-slate-500 max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="font-semibold text-slate-700 text-sm">
              Kamu belum menyelesaikan kuis bab apapun
            </p>
            <p className="text-xs text-slate-400">
              Pilihlah salah satu materi bab bahasa Arab kelas 7, lalu kerjakan kuisnya untuk melihat nilaimu di sini!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r, idx) => {
              const isPassed = (r.percentage || 0) >= 75;
              return (
                <div
                  key={r.id || idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        isPassed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {r.percentage}%
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {r.chapterTitle}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {r.correctAnswers} / {r.totalQuestions} Benar
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(r.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onGoToChapter(r.chapterId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs font-semibold transition-colors self-end sm:self-auto cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Materi Bab</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
