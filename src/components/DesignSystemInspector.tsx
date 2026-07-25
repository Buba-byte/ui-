import React from 'react';
import { Palette, Type, Box, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export const DesignSystemInspector: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 text-xs text-[#FF0083] font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Design Tokens & UI Framing Guidelines</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            Lemonade Brand Design System Architecture
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            A comprehensive overview of visual hierarchy, mathematical radii rules, typography scale, and Lemonade Magenta brand accents used across the onboarding flow.
          </p>
        </div>

        {/* Color Palette */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Palette className="w-5 h-5 text-[#FF0083]" />
            <span>1. Core Color Tokens</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <div className="h-20 rounded-xl bg-[#FF0083] shadow-md flex items-end p-2 text-white font-bold text-xs font-mono">
                #FF0083
              </div>
              <h4 className="font-bold text-sm text-white">Lemonade Magenta</h4>
              <p className="text-xs text-slate-400">Primary brand color used for CTAs, active pills, icons, and Maya accents.</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <div className="h-20 rounded-xl bg-pink-50 border border-pink-200 shadow-xs flex items-end p-2 text-[#FF0083] font-bold text-xs font-mono">
                #FDF2F8
              </div>
              <h4 className="font-bold text-sm text-white">Soft Pink Canvas</h4>
              <p className="text-xs text-slate-400">Subtle background tint for chat bubbles, active states, and discount cards.</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <div className="h-20 rounded-xl bg-slate-900 border border-slate-700 shadow-xs flex items-end p-2 text-slate-200 font-bold text-xs font-mono">
                #0F172A
              </div>
              <h4 className="font-bold text-sm text-white">Dark Slate Charcoal</h4>
              <p className="text-xs text-slate-400">High-contrast text color and container borders for pricing cards.</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <div className="h-20 rounded-xl bg-emerald-500 shadow-md flex items-end p-2 text-slate-950 font-bold text-xs font-mono">
                #10B981
              </div>
              <h4 className="font-bold text-sm text-white">Giveback Emerald</h4>
              <p className="text-xs text-slate-400">Used for safety discounts, active policy badges, and green impact metrics.</p>
            </div>
          </div>
        </div>

        {/* Typography Scale */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Type className="w-5 h-5 text-[#FF0083]" />
            <span>2. Typography & Brand Font Pairings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#FF0083] tracking-widest">Display Brand Logo</span>
              <p className="text-3xl font-serif italic text-white font-extrabold tracking-tight">
                Lemonade
              </p>
              <p className="text-xs text-slate-400">Serif italic font used for brand wordmarks and AI Maya title badges.</p>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#FF0083] tracking-widest">Body & Mobile Copy</span>
              <p className="text-lg font-extrabold text-white">
                "Forget everything you know about insurance."
              </p>
              <p className="text-xs text-slate-400">Clean, geometric sans-serif (Plus Jakarta / System Sans) with generous tracking and line height.</p>
            </div>
          </div>
        </div>

        {/* Buttons & Pills */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Box className="w-5 h-5 text-[#FF0083]" />
            <span>3. Buttons, Pill Inputs, & Nested Radii</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-300">Pill CTA Button (rounded-full)</span>
              <button className="w-full bg-[#FF0083] text-white font-bold py-3 rounded-full text-xs shadow-md">
                Check Our Prices
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-300">Active Choice Pill</span>
              <div className="bg-pink-50 border border-[#FF0083] p-3 rounded-2xl flex justify-between items-center text-xs text-slate-900 font-bold">
                <span>Renters Insurance</span>
                <CheckCircle2 className="w-4 h-4 text-[#FF0083]" />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-300">Interactive Stepper</span>
              <div className="bg-white p-2 rounded-2xl flex justify-between items-center text-slate-900 font-bold text-xs">
                <span>Roommates: 2</span>
                <span className="text-[#FF0083] font-mono text-xs">+ / -</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
