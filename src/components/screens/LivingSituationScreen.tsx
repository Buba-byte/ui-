import React from 'react';
import { CoverageState } from '../../types';
import { Users, Dog, Cat, ArrowLeft, ArrowRight, Plus, Minus, Check, Heart } from 'lucide-react';

interface LivingSituationScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LivingSituationScreen: React.FC<LivingSituationScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const togglePetType = (type: 'dog' | 'cat' | 'other') => {
    const current = [...coverageState.petTypes];
    const exists = current.includes(type);
    const updated = exists ? current.filter((t) => t !== type) : [...current, type];
    updateState({
      petTypes: updated,
      hasPets: updated.length > 0
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white">
      <div className="space-y-5">
        {/* Top Back Navigation & Step Tag */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-[#FF0083] uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
            Step 3: Household
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
              "Who else lives in your home? Knowing about roommates, partners, or furry friends helps us tailor liability coverage."
            </p>
          </div>
        </div>

        {/* Renting vs Owning Segment */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Occupancy Status
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => updateState({ isRenting: true })}
              className={`py-2.5 rounded-xl font-semibold text-xs transition-all ${
                coverageState.isRenting
                  ? 'bg-white text-[#FF0083] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              I Rent
            </button>
            <button
              onClick={() => updateState({ isRenting: false })}
              className={`py-2.5 rounded-xl font-semibold text-xs transition-all ${
                !coverageState.isRenting
                  ? 'bg-white text-[#FF0083] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              I Own
            </button>
          </div>
        </div>

        {/* Roommates Counter Stepper */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#FF0083]" />
                <span>Roommates or Non-Family</span>
              </h4>
              <p className="text-[11px] text-slate-500">How many people share this home with you?</p>
            </div>

            <div className="flex items-center space-x-3 bg-white border border-slate-200 rounded-full p-1 shadow-2xs">
              <button
                onClick={() =>
                  updateState({ roommatesCount: Math.max(0, coverageState.roommatesCount - 1) })
                }
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-extrabold text-xs w-4 text-center">{coverageState.roommatesCount}</span>
              <button
                onClick={() =>
                  updateState({ roommatesCount: coverageState.roommatesCount + 1 })
                }
                className="w-7 h-7 rounded-full bg-[#FF0083] hover:bg-pink-600 flex items-center justify-center text-white font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Pets Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700">
              Do you have pets?
            </label>
            <span className="text-[10px] text-pink-600 font-bold">Liability & Pet Health Available</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => togglePetType('dog')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                coverageState.petTypes.includes('dog')
                  ? 'border-[#FF0083] bg-pink-50/70 text-[#FF0083] font-bold shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Dog className="w-6 h-6" />
              <span className="text-xs">Dogs</span>
            </button>

            <button
              onClick={() => togglePetType('cat')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                coverageState.petTypes.includes('cat')
                  ? 'border-[#FF0083] bg-pink-50/70 text-[#FF0083] font-bold shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Cat className="w-6 h-6" />
              <span className="text-xs">Cats</span>
            </button>

            <button
              onClick={() => togglePetType('other')}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                coverageState.petTypes.includes('other')
                  ? 'border-[#FF0083] bg-pink-50/70 text-[#FF0083] font-bold shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Other</span>
            </button>
          </div>

          {coverageState.hasPets && (
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Pet Name(s) & Breed
              </label>
              <input
                type="text"
                value={coverageState.petNames}
                onChange={(e) => updateState({ petNames: e.target.value })}
                placeholder="e.g., Milo (Golden Retriever)"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={onNext}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Next: Safety Systems</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
