import React from 'react';
import { ComplianceScoreBreakdown } from '../types';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface ComplianceBreakdownModalProps {
  scoreData: ComplianceScoreBreakdown;
  onClose: () => void;
  onOpenAI: () => void;
}

export const ComplianceBreakdownModal: React.FC<ComplianceBreakdownModalProps> = ({
  scoreData,
  onClose,
  onOpenAI,
}) => {
  const getBadge = (status: 'green' | 'orange' | 'red') => {
    if (status === 'green') {
      return (
        <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Compliant
        </span>
      );
    }
    if (status === 'orange') {
      return (
        <span className="flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
          <AlertTriangle className="w-3 h-3 text-amber-600" /> Action Required
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-rose-200">
        <AlertCircle className="w-3 h-3 text-rose-600" /> Urgent
      </span>
    );
  };

  const categories = [
    { title: 'Taxes (KRA iTax)', data: scoreData.taxes },
    { title: 'Licenses (BRS / ODPC)', data: scoreData.licenses },
    { title: 'Payroll (SHA & NSSF)', data: scoreData.payroll },
    { title: 'Permits (County Govt)', data: scoreData.permits },
    { title: 'Filings (Annual Returns)', data: scoreData.filings },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Compliance Health Breakdown</h3>
              <p className="text-xs text-slate-400">Real-Time Business Legal Standing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Ring Summary */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-800">Overall Health Score</div>
              <div className="text-3xl font-extrabold text-emerald-950 mt-0.5">
                {scoreData.overallScore}%
              </div>
              <div className="text-xs font-medium text-emerald-700 mt-0.5 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                {scoreData.statusText}
              </div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center bg-white shadow-xs">
              <span className="text-sm font-black text-emerald-900">{scoreData.overallScore}%</span>
            </div>
          </div>

          {/* Breakdown Items List */}
          <div className="space-y-2.5">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{cat.title}</span>
                  {getBadge(cat.data.status)}
                </div>
                <p className="text-slate-600 text-[11px] leading-tight">{cat.data.note}</p>
              </div>
            ))}
          </div>

          {/* AI Assistance Button */}
          <button
            onClick={() => {
              onClose();
              onOpenAI();
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ask AI Assistant Why Score Changed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
