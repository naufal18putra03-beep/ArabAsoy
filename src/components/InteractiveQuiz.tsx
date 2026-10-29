import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { QuizQuestion } from '../types';
import { useAuth } from '../context/AuthContext';
import { saveQuizSubmission } from '../services/firestoreService';

interface InteractiveQuizProps {
  chapterId: string;
  chapterTitle: string;
  questions: QuizQuestion[];
  onQuizCompleted?: (score: number) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  chapterId,
  chapterTitle,
  questions: initialQuestions,
  onQuizCompleted,
}) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      // Quiz finished!
      setIsFinished(true);
      const totalCorrect = score + (selectedAnswer === currentQ.correctIndex ? 1 : 0);
      const finalPercentage = Math.round((totalCorrect / questions.length) * 100);

      if (onQuizCompleted) {
        onQuizCompleted(finalPercentage);
      }

      // Save to Firestore
      if (user) {
        setIsSaving(true);
        try {
          await saveQuizSubmission({
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            chapterId,
            chapterTitle,
            score: totalCorrect * 25,
            maxScore: questions.length * 25,
            percentage: finalPercentage,
            correctAnswers: totalCorrect,
            totalQuestions: questions.length,
            createdAt: new Date().toISOString(),
          });
          setSaveSuccess(true);
        } catch (err) {
          console.error('Failed to save quiz result to Firestore:', err);
        } finally {
          setIsSaving(false);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsFinished(false);
    setSaveSuccess(false);
  };

  // Generate dynamic questions via server-side Gemini API
  const handleGenerateAiQuiz = async () => {
    setIsGeneratingAiQuiz(true);
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: chapterTitle,
          difficulty: 'Menengah Kelas 7',
          count: 5,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
          handleRestart();
        }
      }
    } catch (err) {
      console.error('Error generating AI quiz:', err);
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  if (isFinished) {
    const finalPercentage = Math.round((score / questions.length) * 100);
    const isPassed = finalPercentage >= 75;

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-center max-w-xl mx-auto shadow-sm">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
            isPassed ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
          }`}
        >
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900">
          {isPassed ? 'Mumtaz! Luar Biasa!' : 'Terus Semangat Belajar!'}
        </h3>
        <p className="font-arabic text-xl font-bold text-emerald-700 mt-1">
          {isPassed ? 'مُمْتَازٌ جِدًّا، بَارَكَ اللّٰهُ فِيكَ' : 'لَا تَحْزَنْ، حَاوِلْ مَرَّةً أُخْرَى'}
        </p>

        <div className="my-6 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="text-4xl font-extrabold text-slate-900">{finalPercentage}%</div>
          <p className="text-sm text-slate-600 mt-1">
            Berhasil menjawab <span className="font-bold text-emerald-700">{score}</span> dari{' '}
            <span className="font-bold">{questions.length}</span> soal dengan tepat
          </p>

          {isSaving ? (
            <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              Menyimpan nilai ke Firestore...
            </p>
          ) : saveSuccess ? (
            <p className="text-xs text-emerald-700 font-semibold mt-3 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Nilai berhasil disimpan di database Firestore!
            </p>
          ) : null}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Kuis
          </button>

          <button
            onClick={handleGenerateAiQuiz}
            disabled={isGeneratingAiQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {isGeneratingAiQuiz ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            Buat Soal Baru dengan AI
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl mx-auto">
      {/* Quiz Progress & Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Kuis {chapterTitle}
          </span>
          <h4 className="text-sm font-semibold text-slate-800">
            Soal {currentIndex + 1} dari {questions.length}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500">Skor Sementara</span>
          <div className="text-base font-extrabold text-emerald-700">
            {score} / {currentIndex + (isAnswerChecked ? 1 : 0)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>

        {currentQ.arabicPrompt && (
          <div className="mt-3 p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-right">
            <p dir="rtl" className="font-arabic text-2xl font-bold text-emerald-900 leading-relaxed">
              {currentQ.arabicPrompt}
            </p>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

          if (isAnswerChecked) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
            } else if (idx === selectedAnswer) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
            } else {
              btnStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
            }
          } else if (selectedAnswer === idx) {
            btnStyle = 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-900 font-semibold';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswerChecked}
              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                    selectedAnswer === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm sm:text-base font-arabic font-medium">{opt}</span>
              </div>

              {isAnswerChecked && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {isAnswerChecked && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation when answered */}
      {isAnswerChecked && (
        <div
          className={`p-4 rounded-2xl mb-6 text-sm ${
            selectedAnswer === currentQ.correctIndex
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border border-amber-200 text-amber-900'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 mb-1">
            {selectedAnswer === currentQ.correctIndex ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Benar! Ahsantal / ممتاز</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-amber-600" />
                <span>Jawaban Kurang Tepat</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end">
        {!isAnswerChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
          >
            Periksa Jawaban
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
          >
            <span>{currentIndex + 1 < questions.length ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
