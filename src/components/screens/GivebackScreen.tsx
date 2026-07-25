import React from 'react';
import { CoverageState } from '../../types';
import { GIVEBACK_CHARITIES } from '../../data/lemonadeData';
import { Heart, Globe, Droplets, ShieldCheck, Utensils, PawPrint, ArrowLeft, ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface GivebackScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GivebackScreen: React.FC<GivebackScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const getCharityIcon = (icon: string) => {
    switch (icon) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'PawPrint': return <PawPrint className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white">
      <div className="space-y-4">
        {/* Top Back Navigation & Step Tag */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-[#FF0083] uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
            Step 7: Lemonade Giveback
          </span>
        </div>

        {/* AI Maya Chat Message Bubble */}
        <div className="flex items-start space-x-3 bg-pink-50/70 p-4 rounded-2xl border border-pink-100">
          <div className="w-10 h-10 rounded-full bg-[#FF0083] text-white font-serif font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            M
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#FF0083]">AI Maya</span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              "Lemonade takes a flat fee, pays claims super fast, and donates leftover money to causes YOU care about."
            </p>
          </div>
        </div>

        {/* Giveback Header Banner */}
        <div className="bg-gradient-to-r from-pink-900 to-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Award className="w-6 h-6 text-pink-400" />
            <div>
              <h4 className="font-bold text-xs">Lemonade B-Corp Giveback</h4>
              <p className="text-[10px] text-pink-200">Over $8.2M donated to non-profits worldwide</p>
            </div>
          </div>
        </div>

        {/* Charity Causes Grid */}
        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
          {GIVEBACK_CHARITIES.map((charity) => {
            const isSelected = coverageState.selectedCharityId === charity.id;
            return (
              <button
                key={charity.id}
                onClick={() => updateState({ selectedCharityId: charity.id })}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#FF0083] bg-pink-50/70 ring-2 ring-[#FF0083]/20 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#FF0083] text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {getCharityIcon(charity.logoIcon)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-900 text-xs">{charity.name}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${charity.badgeColor}`}>
                          {charity.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 line-clamp-2">{charity.description}</p>
                      <p className="text-[9px] text-[#FF0083] font-semibold italic">{charity.impactStatement}</p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
                      isSelected ? 'bg-[#FF0083] border-[#FF0083] text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={onNext}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Calculate AI Quote & Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
