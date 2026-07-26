import React, { useState } from 'react';
import { BusinessProfile, DeviceFrame, NotificationItem } from '../types';
import { Bell, ShieldCheck, Smartphone, Monitor, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeProfile: BusinessProfile;
  profiles: BusinessProfile[];
  onSelectProfile: (profile: BusinessProfile) => void;
  deviceFrame: DeviceFrame;
  setDeviceFrame: (frame: DeviceFrame) => void;
  notifications: NotificationItem[];
  onToggleNotifications: () => void;
  isNotificationOpen: boolean;
  score: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeProfile,
  profiles,
  onSelectProfile,
  deviceFrame,
  setDeviceFrame,
  notifications,
  onToggleNotifications,
  isNotificationOpen,
  score,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand & Active Business Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-base shadow-sm">
              C
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-bold text-base tracking-tight text-white">ComplyKE</span>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded-full font-medium">
                  🇰🇪 Kenya
                </span>
              </div>
              <p className="text-[10px] text-slate-400">AI Business Operating System</p>
            </div>
          </div>

          {/* Business Switcher Pill */}
          <div className="relative ml-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 px-2.5 rounded-lg border border-slate-700 transition"
            >
              <span className="font-medium truncate max-w-[130px] sm:max-w-[200px]">
                {activeProfile.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 text-xs">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Business
                </div>
                {profiles.map((p) => {
                  const isSelected = p.id === activeProfile.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                        isSelected
                          ? 'bg-emerald-950 text-emerald-300 font-medium'
                          : 'text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-medium text-white truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{p.industry}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls: Notifications & View Frame Toggle */}
        <div className="flex items-center gap-2">
          {/* Compliance Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{score}% Score</span>
          </div>

          {/* Device Frame View Mode Switcher */}
          <div className="hidden sm:flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setDeviceFrame('iphone16')}
              title="Mobile App Frame"
              className={`p-1.5 rounded-md transition ${
                deviceFrame === 'iphone16' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceFrame('fullscreen')}
              title="Full Screen Canvas"
              className={`p-1.5 rounded-md transition ${
                deviceFrame === 'fullscreen' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications Toggle Button */}
          <button
            onClick={onToggleNotifications}
            className={`relative p-2 rounded-lg transition border ${
              isNotificationOpen
                ? 'bg-emerald-900 border-emerald-600 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
