import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { MufrodatItem } from '../types';
import { playArabicAudio } from '../utils/audioPlayer';

interface MufrodatCardProps {
  item: MufrodatItem;
}

export const MufrodatCard: React.FC<MufrodatCardProps> = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handlePlayAudio = async () => {
    setIsPlaying(true);
    try {
      await playArabicAudio(item.arabic);
    } finally {
      setTimeout(() => setIsPlaying(false), 800);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Badges & Audio Button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider ${
                item.type === 'fiil'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : item.type === 'dhomir'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {item.type}
            </span>
            {item.gender && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
                  item.gender === 'muannats'
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {item.gender === 'muannats' ? 'Muannats (♀)' : 'Mudzakkar (♂)'}
              </span>
            )}
          </div>

          <button
            onClick={handlePlayAudio}
            title="Dengarkan Pelafalan Suara"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-emerald-600 text-white scale-110 shadow-md shadow-emerald-600/30'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>
        </div>

        {/* Arabic Main Display */}
        <div className="text-right py-2">
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl font-bold text-slate-800 leading-relaxed tracking-wide group-hover:text-emerald-700 transition-colors"
          >
            {item.arabic}
          </p>
        </div>

        {/* Latin & Indonesian Meaning */}
        <div className="mt-2 pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-emerald-600 tracking-wide">
            {item.latin}
          </p>
          <p className="text-sm font-bold text-slate-900 mt-0.5">
            {item.meaning}
          </p>
        </div>
      </div>

      {/* Example Accordion */}
      {item.exampleArabic && (
        <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
          <button
            onClick={() => setShowExample(!showExample)}
            className="flex items-center justify-between w-full text-[11px] font-semibold text-slate-500 hover:text-emerald-600 cursor-pointer"
          >
            <span>Contoh Kalimat</span>
            {showExample ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showExample && (
            <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-right">
              <p dir="rtl" className="font-arabic text-base font-semibold text-emerald-800">
                {item.exampleArabic}
              </p>
              {item.exampleMeaning && (
                <p className="text-left text-xs text-slate-600 mt-1 italic">
                  "{item.exampleMeaning}"
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
