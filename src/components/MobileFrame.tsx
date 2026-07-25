import React from 'react';
import { DeviceFrame } from '../types';
import { Wifi, Signal, Battery } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  frameType: DeviceFrame;
  currentStep: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  frameType,
  currentStep
}) => {
  if (frameType === 'borderless') {
    return (
      <div className="w-full max-w-lg mx-auto bg-white min-h-[750px] shadow-2xl rounded-2xl border border-slate-200 overflow-hidden my-6">
        {children}
      </div>
    );
  }

  const isAndroid = frameType === 'android';

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2">
      {/* Outer Physical Phone Shell */}
      <div 
        className={`relative transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ${
          isAndroid
            ? 'w-[380px] h-[810px] rounded-[44px] bg-slate-900 border-[10px] border-slate-800 p-2'
            : 'w-[390px] h-[830px] rounded-[52px] bg-slate-950 border-[12px] border-slate-900 ring-1 ring-slate-800 p-2.5'
        }`}
      >
        {/* Speaker / Camera Hole for Android or Dynamic Island for iPhone */}
        {!isAndroid ? (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-inner">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900/90 border border-slate-800"></div>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-slate-800"></div>
        )}

        {/* Screen Inner Viewport */}
        <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative select-none">
          {/* iOS / Android Status Bar */}
          <div className="h-11 bg-white/95 backdrop-blur-md px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 z-40 select-none border-b border-slate-100">
            <span>9:41</span>
            <div className="flex items-center space-x-2 text-slate-700">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-mono">100%</span>
                <Battery className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Actual Screen Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
            {children}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="h-5 bg-white flex items-center justify-center z-40 pb-1">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
