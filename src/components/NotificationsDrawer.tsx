import React from 'react';
import { NotificationItem } from '../types';
import { X, Bell, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  const getUrgencyIcon = (urgency: 'green' | 'orange' | 'red') => {
    if (urgency === 'green') return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (urgency === 'orange') return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
    return <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />;
  };

  const getUrgencyBadge = (urgency: 'green' | 'orange' | 'red') => {
    if (urgency === 'green') return <span className="w-2 h-2 rounded-full bg-emerald-500"></span>;
    if (urgency === 'orange') return <span className="w-2 h-2 rounded-full bg-amber-500"></span>;
    return <span className="w-2 h-2 rounded-full bg-rose-500"></span>;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm">Notifications & Alerts</h3>
              <p className="text-[10px] text-slate-400">Government Updates & Timeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Header Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">{notifications.length} Timeline Alerts</span>
          <button
            onClick={onMarkAllAsRead}
            className="text-emerald-700 font-bold hover:underline text-[11px]"
          >
            Mark all read
          </button>
        </div>

        {/* Timeline Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border text-xs space-y-1 transition relative ${
                item.read ? 'bg-white border-slate-200 opacity-80' : 'bg-emerald-50/30 border-emerald-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  {getUrgencyIcon(item.urgency)}
                  <span>{item.title}</span>
                </div>
                {getUrgencyBadge(item.urgency)}
              </div>

              <p className="text-slate-600 text-[11px] leading-relaxed pt-0.5">{item.message}</p>

              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                <span>Agency: {item.agency}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
