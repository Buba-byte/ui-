import React from 'react';
import { CoverageState, ViewMode } from '../types';
import { SCREEN_FLOW_SPECS } from '../data/lemonadeData';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PersonalInfoScreen } from './screens/PersonalInfoScreen';
import { AddressScreen } from './screens/AddressScreen';
import { LivingSituationScreen } from './screens/LivingSituationScreen';
import { SafetySecurityScreen } from './screens/SafetySecurityScreen';
import { ValuablesScreen } from './screens/ValuablesScreen';
import { CoverageCalculatorScreen } from './screens/CoverageCalculatorScreen';
import { GivebackScreen } from './screens/GivebackScreen';
import { QuoteSummaryScreen } from './screens/QuoteSummaryScreen';
import { Eye, Layers, Compass, CheckCircle } from 'lucide-react';

interface BlueprintFlowViewProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onJumpToStep: (step: number) => void;
}

export const BlueprintFlowView: React.FC<BlueprintFlowViewProps> = ({
  coverageState,
  updateState,
  onJumpToStep
}) => {
  const dummyNav = () => {};

  const renderScreenByStep = (stepId: number) => {
    switch (stepId) {
      case 1:
        return <WelcomeScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} />;
      case 2:
        return <PersonalInfoScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 3:
        return <AddressScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 4:
        return <LivingSituationScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 5:
        return <SafetySecurityScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 6:
        return <ValuablesScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 7:
        return <CoverageCalculatorScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 8:
        return <GivebackScreen coverageState={coverageState} updateState={updateState} onNext={dummyNav} onBack={dummyNav} />;
      case 9:
        return <QuoteSummaryScreen coverageState={coverageState} onBack={dummyNav} onReset={dummyNav} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      {/* Blueprint Top Banner Header */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-[#FF0083] text-white font-bold text-xs rounded-full uppercase tracking-widest">
              Design Spec & Flow Map
            </span>
            <span className="text-xs text-slate-400 font-mono">Lemonade iOS/Android Architecture</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            Lemonade Onboarding Screen Framings (9 Layouts)
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Side-by-side inspection grid showing exact component hierarchy, viewport dimensions, micro-interactions, and visual layouts for each step in the AI Maya onboarding sequence.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <div>
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Primary Accent</span>
            <span className="font-mono text-[#FF0083] font-bold">#FF0083 Magenta</span>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <span className="block text-[10px] text-slate-500 font-bold uppercase">Grid Viewport</span>
            <span className="font-mono text-emerald-400 font-bold">390px x 780px (Mobile)</span>
          </div>
        </div>
      </div>

      {/* Screen Framings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SCREEN_FLOW_SPECS.map((spec) => (
          <div
            key={spec.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            {/* Spec Header Bar */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold bg-[#FF0083]/20 text-pink-400 border border-pink-500/30 px-2.5 py-1 rounded-full">
                  Frame {spec.id}: {spec.category}
                </span>
                <button
                  onClick={() => onJumpToStep(spec.id)}
                  className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-[#FF0083] px-3 py-1.5 rounded-xl transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Test Frame</span>
                </button>
              </div>

              <h3 className="font-extrabold text-base text-white group-hover:text-pink-300 transition-colors">
                {spec.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">{spec.description}</p>
            </div>

            {/* Mobile Viewport Screen Enclosure */}
            <div className="w-full h-[520px] bg-white rounded-2xl overflow-hidden border-2 border-slate-800 shadow-inner flex flex-col my-2">
              <div className="bg-slate-100 text-slate-800 text-[10px] font-bold px-3 py-1.5 border-b border-slate-200 flex justify-between items-center select-none">
                <span>9:41</span>
                <span className="font-mono text-slate-500">390 x 780 px</span>
              </div>
              <div className="flex-1 overflow-y-auto pointer-events-none select-none scale-95 origin-top">
                {renderScreenByStep(spec.id)}
              </div>
            </div>

            {/* Spec Technical Breakdown */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-[11px]">
              <div>
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Key Components</span>
                <ul className="text-slate-300 grid grid-cols-1 gap-1 mt-1">
                  {spec.keyComponents.map((comp, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF0083]"></span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] block">Layout & Micro-Interactions</span>
                <p className="text-slate-400 italic text-[11px] mt-0.5">{spec.designNotes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
