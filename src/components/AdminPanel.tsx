import React, { useState, useEffect } from 'react';
import { Shield, Users, Bell, BookPlus, Search, RefreshCw, CheckCircle, Plus, Calendar } from 'lucide-react';
import { QuizSubmissionRecord, Announcement, CustomMaterial } from '../types';
import {
  getAllQuizResults,
  getAnnouncements,
  addAnnouncement,
  getCustomMaterials,
  addCustomMaterial,
} from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';

export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'scores' | 'announcements' | 'materials'>('scores');

  // Scores state
  const [scores, setScores] = useState<QuizSubmissionRecord[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState('all');

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [isSubmittingAnnouncement, setIsSubmittingAnnouncement] = useState(false);

  // Custom materials state
  const [materials, setMaterials] = useState<CustomMaterial[]>([]);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialArabic, setMaterialArabic] = useState('');
  const [materialMeaning, setMaterialMeaning] = useState('');
  const [materialChapterId, setMaterialChapterId] = useState('bab-1');
  const [isSubmittingMaterial, setIsSubmittingMaterial] = useState(false);

  const fetchScores = async () => {
    setIsLoadingScores(true);
    try {
      const data = await getAllQuizResults();
      setScores(data);
    } catch (err) {
      console.error('Error fetching all scores:', err);
    } finally {
      setIsLoadingScores(false);
    }
  };

  const fetchAnnouncementsList = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    }
  };

  const fetchMaterialsList = async () => {
    try {
      const data = await getCustomMaterials();
      setMaterials(data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  useEffect(() => {
    fetchScores();
    fetchAnnouncementsList();
    fetchMaterialsList();
  }, []);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) return;

    setIsSubmittingAnnouncement(true);
    try {
      await addAnnouncement({
        title: announcementTitle.trim(),
        content: announcementContent.trim(),
        authorName: user?.displayName || 'Pak Feri (Guru Bahasa Arab)',
        createdAt: new Date().toISOString(),
      });
      setAnnouncementTitle('');
      setAnnouncementContent('');
      await fetchAnnouncementsList();
    } catch (err) {
      console.error('Failed to create announcement:', err);
    } finally {
      setIsSubmittingAnnouncement(false);
    }
  };

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialTitle.trim() || !materialArabic.trim() || !materialMeaning.trim()) return;

    setIsSubmittingMaterial(true);
    try {
      await addCustomMaterial({
        title: materialTitle.trim(),
        arabic: materialArabic.trim(),
        meaning: materialMeaning.trim(),
        chapterId: materialChapterId,
        authorName: user?.displayName || 'Pak Feri',
        createdAt: new Date().toISOString(),
      });
      setMaterialTitle('');
      setMaterialArabic('');
      setMaterialMeaning('');
      await fetchMaterialsList();
    } catch (err) {
      console.error('Failed to create material:', err);
    } finally {
      setIsSubmittingMaterial(false);
    }
  };

  const filteredScores = scores.filter((s) => {
    const matchName = s.userName.toLowerCase().includes(searchStudent.toLowerCase());
    const matchChapter =
      selectedChapterFilter === 'all' || s.chapterId === selectedChapterFilter;
    return matchName && matchChapter;
  });

  const totalSubmissions = scores.length;
  const avgScore =
    totalSubmissions > 0
      ? Math.round(scores.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalSubmissions)
      : 0;
  const passedCount = scores.filter((s) => (s.percentage || 0) >= 75).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg shadow-purple-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-700/60 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Portal Guru & Administrator (Pak Feri)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dasbor Manajemen Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Pantau rekap nilai kuis siswa di Firestore, kirim pengumuman tugas, dan tambahkan materi suplemen.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchScores}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingScores ? 'animate-spin' : ''}`} />
              <span>Segarkan Data</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-purple-800/60">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200">Total Tes Kuis</span>
            <div className="text-xl sm:text-2xl font-bold mt-0.5">{totalSubmissions}</div>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200">Rata-rata Kelas</span>
            <div className="text-xl sm:text-2xl font-bold mt-0.5 text-emerald-300">
              {avgScore}%
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200">Tuntas (≥75%)</span>
            <div className="text-xl sm:text-2xl font-bold mt-0.5 text-amber-300">
              {passedCount} Siswa
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setActiveTab('scores')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'scores'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Rekap Nilai Siswa</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {scores.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'announcements'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pengumuman Kelas</span>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'materials'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookPlus className="w-4 h-4" />
          <span>Tambah Kosakata Suplemen</span>
        </button>
      </div>

      {/* Tab 1: Scores Table */}
      {activeTab === 'scores' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Cari nama siswa..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
              />
            </div>

            <select
              value={selectedChapterFilter}
              onChange={(e) => setSelectedChapterFilter(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">Semua Bab</option>
              <option value="bab-1">Bab 1: At-Ta'aruf</option>
              <option value="bab-2">Bab 2: Al-Marafiq</option>
              <option value="bab-3">Bab 3: Al-Adawat</option>
              <option value="bab-4">Bab 4: Al-'Unwan</option>
              <option value="bab-5">Bab 5: Al-Bait</option>
              <option value="bab-6">Bab 6: Min Yaumiyyat</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoadingScores ? (
              <div className="py-12 text-center text-slate-400 text-xs sm:text-sm flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                <span>Memuat data nilai dari Firestore...</span>
              </div>
            ) : filteredScores.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                Belum ada data kuis yang cocok. Siswa yang mengerjakan kuis akan otomatis tercatat di sini.
              </div>
            ) : (
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="pb-3 px-3">Nama Siswa</th>
                    <th className="pb-3 px-3">Bab Kuis</th>
                    <th className="pb-3 px-3">Jawaban Benar</th>
                    <th className="pb-3 px-3">Nilai</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3">Waktu Selesai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredScores.map((s, idx) => {
                    const isPassed = (s.percentage || 0) >= 75;
                    return (
                      <tr key={s.id || idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {s.userName}
                          {s.userEmail && (
                            <div className="text-[11px] text-slate-400 font-normal">
                              {s.userEmail}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{s.chapterTitle}</td>
                        <td className="py-3 px-3 text-slate-600">
                          {s.correctAnswers} / {s.totalQuestions}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          <span
                            className={`px-2 py-0.5 rounded-md ${
                              isPassed ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                            }`}
                          >
                            {s.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              isPassed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            {isPassed ? 'Tuntas' : 'Perlu Bimbingan'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {new Date(s.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Announcements */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Announcement Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs h-fit">
            <h3 className="font-bold text-slate-900 text-base mb-1">Buat Pengumuman Baru</h3>
            <p className="text-xs text-slate-500 mb-4">
              Siarkan pesan tugas, pengingat hafalan mufrodat, atau ulangan harian kepada siswa.
            </p>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Pengumuman
                </label>
                <input
                  type="text"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="Contoh: Tugas Hafalan Bab 2"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Pesan / Instruksi Tugas
                </label>
                <textarea
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  rows={4}
                  placeholder="Tuliskan petunjuk tugas atau pesan pengingat..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAnnouncement}
                className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmittingAnnouncement ? 'Menyimpan...' : 'Kirim Pengumuman'}</span>
              </button>
            </form>
          </div>

          {/* List of Announcements */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Pengumuman Aktif</h3>
            {announcements.length === 0 ? (
              <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 text-xs sm:text-sm">
                Belum ada pengumuman yang dibuat. Gunakan formulir di sebelah kiri untuk menyiarkan informasi ke siswa.
              </div>
            ) : (
              announcements.map((a, idx) => (
                <div
                  key={a.id || idx}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-slate-900 text-base">{a.title}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {new Date(a.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {a.content}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-purple-700">
                    Oleh: {a.authorName}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Custom Materials */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Material Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs h-fit">
            <h3 className="font-bold text-slate-900 text-base mb-1">Tambah Kosakata Suplemen</h3>
            <p className="text-xs text-slate-500 mb-4">
              Tambahkan mufrodat atau contoh kalimat baru ke Firestore agar dipelajari siswa.
            </p>

            <form onSubmit={handleCreateMaterial} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Bab Terkait
                </label>
                <select
                  value={materialChapterId}
                  onChange={(e) => setMaterialChapterId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="bab-1">Bab 1: At-Ta'aruf</option>
                  <option value="bab-2">Bab 2: Al-Marafiq</option>
                  <option value="bab-3">Bab 3: Al-Adawat</option>
                  <option value="bab-4">Bab 4: Al-'Unwan</option>
                  <option value="bab-5">Bab 5: Al-Bait</option>
                  <option value="bab-6">Bab 6: Min Yaumiyyat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Kosakata / Frasa
                </label>
                <input
                  type="text"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  placeholder="Contoh: Ungkapan Maaf"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teks Arab (Berharakat)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={materialArabic}
                  onChange={(e) => setMaterialArabic(e.target.value)}
                  placeholder="عَفْوًا، أَنَا آسِفٌ"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-arabic text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Arti Bahasa Indonesia
                </label>
                <input
                  type="text"
                  value={materialMeaning}
                  onChange={(e) => setMaterialMeaning(e.target.value)}
                  placeholder="Sama-sama / Maafkan saya"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingMaterial}
                className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmittingMaterial ? 'Menyimpan...' : 'Simpan Kosakata ke Firestore'}</span>
              </button>
            </form>
          </div>

          {/* List of Custom Materials */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Kosakata Suplemen Tersimpan</h3>
            {materials.length === 0 ? (
              <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 text-xs sm:text-sm">
                Belum ada kosakata suplemen yang ditambahkan.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {materials.map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs text-right"
                  >
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 mb-2">
                      {m.title}
                    </span>
                    <p dir="rtl" className="font-arabic text-2xl font-bold text-slate-900 mb-1">
                      {m.arabic}
                    </p>
                    <p className="text-left text-xs font-semibold text-slate-600 mt-2 pt-2 border-t border-slate-100">
                      {m.meaning}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
