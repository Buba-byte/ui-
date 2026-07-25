import React from 'react';
import { ViewMode, DeviceFrame } from '../types';
import { 
  Sparkles, 
  Grid3X3, 
  Smartphone, 
  Palette, 
  MessageCircle, 
  RotateCcw, 
  ChevronRight,
  Layers,
  ShieldAlert
} from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceFrame: DeviceFrame;
  setDeviceFrame: (frame: DeviceFrame) => void;
  onOpenMayaChat: () => void;
  onReset: () => void;
  onJumpToStep: (step: number) => void;
  productTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  viewMode,
  setViewMode,
  deviceFrame,
  setDeviceFrame,
  onOpenMayaChat,
  onReset,
  onJumpToStep,
  productTitle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & App Tag */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-[#FF0083] to-pink-600 px-3.5 py-1.5 rounded-full font-bold text-white tracking-tight shadow-sm cursor-pointer" onClick={() => onJumpToStep(1)}>
            <span className="text-xl italic font-serif tracking-tight">Lemonade</span>
            <span className="text-[10px] uppercase font-sans tracking-widest bg-white/20 px-1.5 py-0.5 rounded text-white">Flow</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 border-l border-slate-700 pl-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Onboarding Architecture UI</span>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'interactive'
                ? 'bg-[#FF0083] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interactive Flow</span>
            <span className="sm:hidden">Flow</span>
          </button>

          <button
            onClick={() => setViewMode('blueprint')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'blueprint'
                ? 'bg-[#FF0083] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Framing Blueprint</span>
            <span className="sm:hidden">Blueprint</span>
          </button>

          <button
            onClick={() => setViewMode('design-system')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'design-system'
                ? 'bg-[#FF0083] text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Design System</span>
            <span className="sm:hidden">Design</span>
          </button>
        </div>

        {/* Actions & AI Maya Button */}
        <div className="flex items-center space-x-2">
          {/* Quick AI Maya Button */}
          <button
            onClick={onOpenMayaChat}
            className="flex items-center space-x-2 bg-pink-950/60 hover:bg-pink-900/80 text-pink-300 border border-pink-700/50 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm hover:scale-105"
          >
            <div className="w-5 h-5 rounded-full bg-[#FF0083] flex items-center justify-center text-white font-bold text-[10px]">
              M
            </div>
            <span className="hidden sm:inline">Ask AI Maya</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </button>

          {/* Device Frame Dropdown (Only in Interactive mode) */}
          {viewMode === 'interactive' && (
            <div className="hidden lg:flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setDeviceFrame('iphone16')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'iphone16' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="iPhone Frame"
              >
                iPhone
              </button>
              <button
                onClick={() => setDeviceFrame('android')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'android' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Android Frame"
              >
                Android
              </button>
              <button
                onClick={() => setDeviceFrame('borderless')}
                className={`px-2 py-1 rounded transition-colors ${
                  deviceFrame === 'borderless' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Full Responsive"
              >
                Full Width
              </button>
            </div>
          )}

          {/* Reset Flow Button */}
          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Flow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Progress Bar & Quick Step Selector Sub-bar */}
      {viewMode === 'interactive' && (
        <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-300">
            {/* Step Navigation Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Layout Frame:</span>
              <select
                value={currentStep}
                onChange={(e) => onJumpToStep(Number(e.target.value))}
                className="bg-slate-800 text-white font-medium px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#FF0083] text-xs"
              >
                <option value={1}>Frame 1: Product Pick & Landing</option>
                <option value={2}>Frame 2: Personal Identity</option>
                <option value={3}>Frame 3: Property Address & Pinpoint Map</option>
                <option value={4}>Frame 4: Household & Living Details</option>
                <option value={5}>Frame 5: Safety Systems & Discounts</option>
                <option value={6}>Frame 6: High-Value Items & Tech</option>
                <option value={7}>Frame 7: Interactive Coverage Sliders</option>
                <option value={8}>Frame 8: Lemonade Giveback Cause</option>
                <option value={9}>Frame 9: AI Risk Quote & Sign</option>
              </select>

              <span className="hidden md:inline-block text-slate-500 font-mono text-[11px]">
                ({productTitle})
              </span>
            </div>

            {/* Step Counter */}
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-pink-400">Step {currentStep} of {totalSteps}</span>
              <div className="w-24 sm:w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF0083] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
