import React from 'react';
import { DeviceFrame } from '../types';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  frameType: DeviceFrame;
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ frameType, children }) => {
  if (frameType === 'fullscreen') {
    return (
      <div className="w-full max-w-2xl mx-auto min-h-[750px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-2 w-full max-w-[400px] h-[810px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-950 flex flex-col">
      {/* Phone Hardware Features */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800"></div>
        <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full bg-slate-50 rounded-[38px] overflow-hidden flex flex-col pt-6">
        {/* Mobile Status Bar */}
        <div className="px-6 pt-1 pb-2 flex items-center justify-between text-slate-900 text-[11px] font-semibold select-none z-40 bg-white/80 backdrop-blur-md">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3 h-3 fill-slate-700" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 fill-slate-700" />
          </div>
        </div>

        {/* Content View Area */}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
          {children}
        </div>

        {/* iPhone Home Indicator Pill */}
        <div className="w-full py-1.5 bg-white flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
