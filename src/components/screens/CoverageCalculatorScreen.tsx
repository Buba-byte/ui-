import React, { useState } from 'react';
import { CoverageState } from '../../types';
import { Sliders, ShieldCheck, DollarSign, ArrowLeft, ArrowRight, HelpCircle, Check, Sparkles } from 'lucide-react';

interface CoverageCalculatorScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CoverageCalculatorScreen: React.FC<CoverageCalculatorScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const [waterBackup, setWaterBackup] = useState(true);
  const [identityTheft, setIdentityTheft] = useState(false);

  // Dynamic price engine formula based on selections
  const baseRate = 5.0;
  const propertyFactor = (coverageState.personalPropertyLimit / 10000) * 1.8;
  const liabilityFactor = (coverageState.personalLiabilityLimit / 100000) * 1.2;
  const deductibleDiscount = coverageState.deductible === 250 ? 2.5 : coverageState.deductible === 500 ? 0 : coverageState.deductible === 1000 ? -2.0 : -3.5;
  const addOnsTotal = (waterBackup ? 1.2 : 0) + (identityTheft ? 1.5 : 0);
  const discountMultiplier = 1 - (coverageState.discountPercentage || 0) / 100;

  const calculatedMonthly = Math.max(
    5.0,
    Number(((baseRate + propertyFactor + liabilityFactor + deductibleDiscount + addOnsTotal) * discountMultiplier).toFixed(2))
  );

  const handleSliderChange = (field: keyof CoverageState, val: number) => {
    updateState({
      [field]: val,
      monthlyPrice: calculatedMonthly
    });
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
            Step 6: Policy Limits
          </span>
        </div>

        {/* Live Dynamic Price Header Bar */}
        <div className="bg-gradient-to-r from-[#FF0083] to-pink-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-pink-100 font-bold">Estimated Monthly Rate</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-extrabold">${calculatedMonthly}</span>
              <span className="text-xs text-pink-100 font-medium">/ month</span>
            </div>
          </div>

          <div className="text-right bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
            <span className="text-[10px] font-bold block text-pink-100">Zero Paperwork</span>
            <span className="text-[11px] font-extrabold text-white">Instant Coverage</span>
          </div>
        </div>

        {/* Coverage Limit Sliders */}
        <div className="space-y-4 pt-1 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {/* Personal Property Slider */}
          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Personal Property</span>
              <span className="font-extrabold text-[#FF0083] bg-pink-100/70 px-2.5 py-0.5 rounded-full">
                ${coverageState.personalPropertyLimit.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">Covers furniture, clothes, tech, and gear anywhere in the world.</p>
            <input
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={coverageState.personalPropertyLimit}
              onChange={(e) => handleSliderChange('personalPropertyLimit', Number(e.target.value))}
              className="w-full accent-[#FF0083] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Personal Liability Slider */}
          <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Personal Liability</span>
              <span className="font-extrabold text-[#FF0083] bg-pink-100/70 px-2.5 py-0.5 rounded-full">
                ${coverageState.personalLiabilityLimit.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">Protects you if someone gets injured or property is accidentally damaged.</p>
            <input
              type="range"
              min={100000}
              max={500000}
              step={50000}
              value={coverageState.personalLiabilityLimit}
              onChange={(e) => handleSliderChange('personalLiabilityLimit', Number(e.target.value))}
              className="w-full accent-[#FF0083] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Deductible Selector Pills */}
          <div className="space-y-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Deductible</span>
              <span className="text-[10px] text-slate-500">Amount you pay before claim coverage</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[250, 500, 1000, 2500].map((ded) => {
                const isSelected = coverageState.deductible === ded;
                return (
                  <button
                    key={ded}
                    onClick={() => updateState({ deductible: ded, monthlyPrice: calculatedMonthly })}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#FF0083] text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ${ded}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra Coverage Toggles */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">Extra Protection Add-ons</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setWaterBackup(!waterBackup)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  waterBackup ? 'border-[#FF0083] bg-pink-50/70' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Water Backup</span>
                  <span className="text-[10px] font-bold text-[#FF0083]">+$1.20/mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Covers drain & pipe backup</p>
              </button>

              <button
                onClick={() => setIdentityTheft(!identityTheft)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  identityTheft ? 'border-[#FF0083] bg-pink-50/70' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Identity Theft</span>
                  <span className="text-[10px] font-bold text-[#FF0083]">+$1.50/mo</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Up to $25k recovery funds</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={() => {
            updateState({ monthlyPrice: calculatedMonthly });
            onNext();
          }}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Next: Pick Your Giveback Cause</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
