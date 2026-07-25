import React from 'react';
import { CoverageState } from '../../types';
import { ShieldCheck, Flame, Lock, Droplets, Bell, Key, ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

interface SafetySecurityScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SafetySecurityScreen: React.FC<SafetySecurityScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const safetyItems = [
    {
      key: 'hasSmokeAlarm' as const,
      label: 'Smoke & Fire Alarms',
      desc: 'Working smoke detectors installed in hallways and bedrooms',
      discount: '-5%',
      icon: Flame,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      key: 'hasBurglarAlarm' as const,
      label: 'Central Burglar Alarm',
      desc: 'Monitored alarm system directly connected to police/security',
      discount: '-10%',
      icon: Bell,
      color: 'text-indigo-500 bg-indigo-50'
    },
    {
      key: 'hasWaterLeakSensor' as const,
      label: 'Smart Water Leak Detector',
      desc: 'Automatic shut-off valve or sensors under sinks/appliances',
      discount: '-5%',
      icon: Droplets,
      color: 'text-sky-500 bg-sky-50'
    },
    {
      key: 'hasDeadbolts' as const,
      label: 'Deadbolt Locks',
      desc: 'Heavy-duty deadbolts on exterior doors',
      discount: '-3%',
      icon: Key,
      color: 'text-slate-600 bg-slate-100'
    },
    {
      key: 'hasSprinklers' as const,
      label: 'Fire Sprinklers',
      desc: 'In-ceiling automated fire suppression sprinkler heads',
      discount: '-5%',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50'
    }
  ];

  // Calculate active total discount percentage
  const totalDiscount = safetyItems.reduce((acc, item) => {
    if (coverageState[item.key]) {
      return acc + parseInt(item.discount.replace('-', '').replace('%', ''), 10);
    }
    return acc;
  }, 0);

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
            Step 4: Safety Check
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
              "Safety pays off! Select the protective devices installed in your home to unlock instant monthly discounts."
            </p>
          </div>
        </div>

        {/* Discount Counter Badge */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Safety Discount</span>
              <p className="text-xs font-semibold text-emerald-300">
                {totalDiscount}% Off Monthly Base Premium
              </p>
            </div>
          </div>
          <span className="text-lg font-extrabold text-emerald-400">-{totalDiscount}%</span>
        </div>

        {/* Safety Items Checklist */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {safetyItems.map((item) => {
            const isChecked = coverageState[item.key];
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => {
                  updateState({
                    [item.key]: !isChecked,
                    discountPercentage: totalDiscount
                  });
                }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isChecked
                    ? 'border-[#FF0083] bg-pink-50/50 shadow-xs ring-1 ring-[#FF0083]/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 text-xs">{item.label}</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                        {item.discount}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-[#FF0083] border-[#FF0083] text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
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
          <span>Next: High-Value Items</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
