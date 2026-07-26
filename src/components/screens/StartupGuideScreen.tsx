import React, { useState } from 'react';
import { StartupDocumentStep, BusinessProfile } from '../../types';
import { 
  Rocket, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Bot, 
  ExternalLink, 
  Sparkles, 
  FileCheck, 
  Plus, 
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface StartupGuideScreenProps {
  profile: BusinessProfile;
  steps: StartupDocumentStep[];
  onUpdateStepStatus: (stepId: string, newStatus: 'not_started' | 'in_progress' | 'acquired', docRef?: string) => void;
  onAskAIAboutStep: (step: StartupDocumentStep) => void;
}

export const StartupGuideScreen: React.FC<StartupGuideScreenProps> = ({
  profile,
  steps,
  onUpdateStepStatus,
  onAskAIAboutStep,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'All' | 'Required' | 'Acquired'>('All');

  const completedCount = steps.filter((s) => s.status === 'acquired').length;
  const totalCount = steps.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const totalEstimatedCosts = steps.reduce((sum, s) => sum + s.estimatedFee, 0);

  const filteredSteps = steps.filter((s) => {
    if (selectedCategoryFilter === 'Required') return s.isRequired;
    if (selectedCategoryFilter === 'Acquired') return s.status === 'acquired';
    return true;
  });

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Startup Legal Roadmap</h1>
          <p className="text-xs text-slate-500">Kenyan Legal Documents & Portal Acquisition Assistant</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-2xs">
          <Rocket className="w-4 h-4" />
        </div>
      </div>

      {/* Progress & Cost Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-4 shadow-xs border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs text-white">Startup Compliance Readiness</span>
          </div>
          <span className="text-[10px] bg-emerald-900 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
            {completedCount} of {totalCount} Documents Acquired
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span>Overall Legal Readiness: {progressPercent}%</span>
            <span>Total Registration Fees: KSh {totalEstimatedCosts.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* AI Startup Tip */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 flex items-start gap-2.5">
        <Bot className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-emerald-900">ComplyAI Startup Strategy</div>
          <p className="text-[11px] text-emerald-800 mt-0.5">
            For <span className="font-bold">{profile.name}</span> ({profile.industry}), start by reserving your company name on eCitizen (BRS), then apply for your KRA Business PIN immediately to open your commercial bank or M-PESA Till account.
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {filteredSteps.map((step, idx) => {
          const isAcquired = step.status === 'acquired';
          const isInProgress = step.status === 'in_progress';

          return (
            <div
              key={step.id}
              className={`bg-white rounded-2xl p-4 border shadow-2xs space-y-3 transition hover:shadow-md ${
                isAcquired
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : isInProgress
                  ? 'border-amber-300 bg-amber-50/10'
                  : 'border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 font-mono font-bold text-xs text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                        {step.agencyCode}
                      </span>
                      {step.isRequired && (
                        <span className="text-[9px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.2 rounded-md">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 mt-1">{step.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-slate-900">
                    {step.estimatedFee === 0 ? 'FREE' : `KSh ${step.estimatedFee.toLocaleString()}`}
                  </div>
                  <div className="mt-1">
                    {isAcquired ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Acquired
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-amber-600" /> In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        Not Started
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Reference if Acquired */}
              {isAcquired && step.documentRef && (
                <div className="bg-emerald-100/60 border border-emerald-200 rounded-xl p-2 text-[11px] text-emerald-950 font-mono font-semibold flex items-center justify-between">
                  <span>Reference: {step.documentRef}</span>
                  <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                </div>
              )}

              {/* AI Advice Tip */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[11px] text-slate-700 flex items-start gap-2">
                <Bot className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">AI Advice: </span>
                  <span>{step.aiGuidanceTip}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => onAskAIAboutStep(step)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>How to get this</span>
                </button>

                <div className="flex items-center gap-2">
                  {!isAcquired && (
                    <button
                      onClick={() => onUpdateStepStatus(step.id, 'acquired', `REF-${Math.floor(100000 + Math.random() * 900000)}`)}
                      className="text-[11px] font-extrabold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-xl transition"
                    >
                      Mark Acquired
                    </button>
                  )}
                  <a
                    href={step.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
