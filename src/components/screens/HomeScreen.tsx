import React, { useState } from 'react';
import { BusinessProfile, ObligationItem, ComplianceScoreBreakdown, MonthlyFinancialSummary, FounderWallet, NewsFeedItem } from '../../types';
import { ShieldCheck, CheckCircle2, ChevronRight, AlertTriangle, ArrowRight, ShieldAlert, Wallet, Rocket, PiggyBank, Sparkles, Building2, Tv, LayoutDashboard } from 'lucide-react';
import { NewsFeedsScreen } from './NewsFeedsScreen';

interface HomeScreenProps {
  profile: BusinessProfile;
  scoreData: ComplianceScoreBreakdown;
  obligations: ObligationItem[];
  summary: MonthlyFinancialSummary;
  wallet: FounderWallet;
  newsItems?: NewsFeedItem[];
  onOpenScoreBreakdown: () => void;
  onPayObligation: (obligation: ObligationItem) => void;
  onViewReceipt: (receiptRef: string) => void;
  onNavigateTab: (tab: 'payments' | 'documents' | 'assistant' | 'startup_guide') => void;
  onOpenOnboarding: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  scoreData,
  obligations,
  summary,
  wallet,
  newsItems,
  onOpenScoreBreakdown,
  onPayObligation,
  onViewReceipt,
  onNavigateTab,
  onOpenOnboarding,
}) => {
  const [activeSubView, setActiveSubView] = useState<'overview' | 'feeds'>('overview');

  // Sort tasks by priority (urgent/action required first)
  const pendingTasks = obligations.filter((o) => !o.isPaid);
  const topTasks = obligations.slice(0, 4);

  const totalVaultsSaved = wallet.vaults.reduce((sum, v) => sum + v.currentAmount, 0);
  const totalNextMonthRequired = wallet.nextMonthLiabilitiesTotal;
  const coveragePercent = Math.min(100, Math.round((totalVaultsSaved / totalNextMonthRequired) * 100));

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-8">
      {/* Greeting & Business Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Good Morning, {profile.ownerName.split(' ')[0]} 👋
            </h1>
            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
              profile.stage === 'startup' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}>
              {profile.stage === 'startup' ? 'New Startup' : 'Existing Business'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{profile.name} • {profile.businessType}</p>
        </div>

        <button
          onClick={onOpenOnboarding}
          className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 transition"
        >
          Switch Profile
        </button>
      </div>

      {/* Segmented Sub-Nav Toggle Pills */}
      <div className="flex items-center bg-slate-200/70 p-1 rounded-2xl border border-slate-300/60">
        <button
          onClick={() => setActiveSubView('overview')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
            activeSubView === 'overview'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveSubView('feeds')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
            activeSubView === 'feeds'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tv className="w-3.5 h-3.5 text-rose-600" />
          <span>Biashara Pulse</span>
        </button>
      </div>

      {activeSubView === 'overview' ? (
        <>
          {/* Founder Reserve Wallet Quick Banner */}
          <div 
            onClick={() => onNavigateTab('payments')}
            className="cursor-pointer bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-2xl p-3.5 shadow-xs border border-emerald-800/80 flex items-center justify-between transition hover:border-emerald-500 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  <span>Founder's Reserve Vault</span>
                  <span className="text-[9px] bg-emerald-800 text-emerald-200 font-bold px-1.5 py-0.2 rounded-md">
                    {coveragePercent}% Funded
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Saved KSh {totalVaultsSaved.toLocaleString()} for rent & next month tax obligations.
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition shrink-0" />
          </div>

          {/* Stage Specific Hero Action Card */}
          {profile.stage === 'startup' ? (
            <div 
              onClick={() => onNavigateTab('startup_guide')}
              className="cursor-pointer bg-amber-500/10 border border-amber-300/80 rounded-2xl p-3.5 flex items-center justify-between text-amber-950 transition hover:bg-amber-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-slate-900">Startup Legal Document Assistant</div>
                  <p className="text-[11px] text-slate-600">
                    AI guide on BRS incorporation, KRA PIN, County Permit & SHA/NSSF.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
            </div>
          ) : null}

          {/* Compliance Score Card - Large Circular Progress Indicator */}
          <div 
            onClick={onOpenScoreBreakdown}
            className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 shadow-lg border border-slate-800 relative overflow-hidden group transition hover:border-emerald-700"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Compliance Score</span>
                </div>
                <div className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>{scoreData.statusText}</span>
                  <span className="text-emerald-400 text-xs">🟢</span>
                </div>
                <p className="text-[11px] text-slate-300 max-w-[210px] leading-tight">
                  Tap to view full breakdown of Taxes, Licenses, Payroll, Permits & Filings.
                </p>
              </div>

              {/* Large Circular Progress Indicator */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400 transition-all duration-1000 ease-out"
                    strokeDasharray={`${scoreData.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-lg font-black text-white leading-none">{scoreData.overallScore}%</span>
                  <span className="text-[9px] text-emerald-400 font-semibold uppercase">Health</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{pendingTasks.length} action items pending attention</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                Details <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Today's Tasks Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">Today's Remittances</h2>
              <button
                onClick={() => onNavigateTab('payments')}
                className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5 hover:underline"
              >
                View All ({obligations.length}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {topTasks.map((task) => {
                const isUrgent = task.daysRemaining <= 2 && !task.isPaid;
                const isWarning = task.daysRemaining <= 14 && !task.isPaid && !isUrgent;

                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl p-4 border shadow-xs transition hover:shadow-md flex flex-col justify-between space-y-3 ${
                      task.isPaid
                        ? 'border-emerald-200/80 bg-emerald-50/20'
                        : isUrgent
                        ? 'border-amber-300 bg-amber-50/20'
                        : isWarning
                        ? 'border-orange-200'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {task.agencyCode}
                          </span>
                          {task.isPaid ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                            </span>
                          ) : isUrgent ? (
                            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3 text-rose-600" /> {task.dueDate}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" /> {task.dueDate}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">{task.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-slate-900">
                          KSh {task.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {task.isPaid ? 'Archived e-Receipt' : `Penalty Avoided: KSh ${(task.penaltyAvoided || 5000).toLocaleString()}`}
                      </span>

                      {task.isPaid ? (
                        <button
                          onClick={() => onViewReceipt(task.receiptRef || 'SHA-2026-981024')}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition"
                        >
                          Receipt Available
                        </button>
                      ) : (
                        <button
                          onClick={() => onPayObligation(task)}
                          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
                        >
                          <span>Pay Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Financial Summary */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Monthly Summary</span>
                <h3 className="text-sm font-bold text-white">Compliance Costs & Savings</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                July 2026
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-medium">Total Legal Costs</div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  KSh {(summary.totalLegalCosts / 1000).toFixed(1)}k
                </div>
              </div>
              <div className="bg-emerald-950/60 p-2.5 rounded-2xl border border-emerald-800/60">
                <div className="text-[10px] text-emerald-400 font-medium">Potential Savings</div>
                <div className="text-xs sm:text-sm font-extrabold text-emerald-300 mt-1">
                  KSh {(summary.potentialSavings / 1000).toFixed(1)}k
                </div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60">
                <div className="text-[10px] text-slate-400 font-medium">Penalties Avoided</div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-400 mt-1">
                  KSh {(summary.penaltiesAvoided / 1000).toFixed(1)}k
                </div>
              </div>
            </div>

            {/* Large Primary Action Button */}
            <button
              onClick={() => onNavigateTab('payments')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 px-4 rounded-2xl shadow-md transition text-sm flex items-center justify-center gap-2"
            >
              <span>Pay Due Obligations (KSh {summary.dueThisMonth.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <NewsFeedsScreen newsItems={newsItems || []} />
      )}
    </div>
  );
};

