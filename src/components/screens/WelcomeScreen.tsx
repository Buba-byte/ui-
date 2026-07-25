import React from 'react';
import { CoverageState, InsuranceType } from '../../types';
import { INSURANCE_PRODUCTS } from '../../data/lemonadeData';
import { Home, Building2, Dog, Car, HeartHandshake, ShieldCheck, Zap, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WelcomeScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  coverageState,
  updateState,
  onNext
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Dog': return <Dog className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      default: return <Home className="w-6 h-6" />;
    }
  };

  const handleProductSelect = (id: InsuranceType) => {
    updateState({ productType: id });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-pink-50/70 via-white to-white">
      {/* Top AI Maya Greeting Banner */}
      <div className="space-y-4">
        {/* Maya Avatar & Tagline */}
        <div className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF0083] to-pink-500 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md ring-2 ring-pink-200">
            M
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF0083]">AI Maya</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-xs font-medium text-slate-800 mt-0.5">
              "Hi! I’m Maya. I’ll help you get instant coverage in under 90 seconds."
            </p>
          </div>
        </div>

        {/* Hero Title */}
        <div className="pt-2 text-center space-y-1.5">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Forget everything you know about insurance.
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            Instant everything. Killer prices. Big heart. Select what you'd like to protect today.
          </p>
        </div>

        {/* Insurance Product Grid */}
        <div className="space-y-2.5 pt-2">
          {INSURANCE_PRODUCTS.map((prod) => {
            const isSelected = coverageState.productType === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => handleProductSelect(prod.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'border-[#FF0083] bg-pink-50/60 ring-2 ring-[#FF0083]/20 shadow-md transform scale-[1.01]'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#FF0083] text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getIcon(prod.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-slate-900 text-sm">{prod.title}</h3>
                      {prod.popular && (
                        <span className="text-[10px] font-bold bg-pink-100 text-[#FF0083] px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{prod.tagline}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="font-extrabold text-xs text-[#FF0083]">{prod.startingPrice}</span>
                  <div
                    className={`w-5 h-5 rounded-full border mt-1 flex items-center justify-center ${
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

        {/* Trust Credentials */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-slate-500 font-medium">
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <Award className="w-4 h-4 text-[#FF0083] mb-1" />
            <span>Certified B-Corp</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <Zap className="w-4 h-4 text-amber-500 mb-1" />
            <span>Instant Payouts</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
            <span>Zero Paperwork</span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={onNext}
          className="w-full bg-[#FF0083] hover:bg-pink-600 active:scale-98 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Check Our Prices</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
