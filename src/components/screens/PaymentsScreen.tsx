import React, { useState } from 'react';
import { ObligationItem, FounderWallet, BusinessProfile, ComplianceScoreBreakdown, FundingOffer } from '../../types';
import { Search, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, Lightbulb, Wallet, Plus, ArrowUpRight, Banknote, CreditCard, Landmark } from 'lucide-react';
import { FundingScreen } from './FundingScreen';

interface PaymentsScreenProps {
  obligations: ObligationItem[];
  wallet?: FounderWallet;
  profile?: BusinessProfile;
  scoreData?: ComplianceScoreBreakdown;
  fundingOffers?: FundingOffer[];
  onPayObligation: (obligation: ObligationItem) => void;
  onViewReceipt: (receiptRef: string) => void;
  onTopUpMpesa?: () => void;
  onCreateVault?: (title: string, targetAmount: number, category: 'rent' | 'statutory' | 'permits' | 'emergency') => void;
  onNavigateToDocuments?: () => void;
}

export const PaymentsScreen: React.FC<PaymentsScreenProps> = ({
  obligations,
  wallet,
  profile,
  scoreData,
  fundingOffers,
  onPayObligation,
  onViewReceipt,
  onTopUpMpesa,
  onCreateVault,
  onNavigateToDocuments,
}) => {
  const [activeSubView, setActiveSubView] = useState<'remittances' | 'reserve_vault' | 'funding'>('remittances');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: string[] = [
    'All',
    'KRA Tax',
    'SHA Healthcare',
    'NSSF Pension',
    'County Permit',
    'Licences & Regulatory'
  ];

  const filtered = obligations.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agencyCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalDue = obligations
    .filter((o) => !o.isPaid)
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Top Title & Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Payments & Credit</h1>
          <p className="text-xs text-slate-500">Government Gateway, Reserve Vault & SME Loans</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Pending Due</div>
          <div className="text-sm font-black text-emerald-700">KSh {totalDue.toLocaleString()}</div>
        </div>
      </div>

      {/* Sub-Nav Segmented Control Pills */}
      <div className="flex items-center bg-slate-200/70 p-1 rounded-2xl border border-slate-300/60">
        <button
          onClick={() => setActiveSubView('remittances')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeSubView === 'remittances'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
          <span>Remittances</span>
        </button>

        <button
          onClick={() => setActiveSubView('reserve_vault')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeSubView === 'reserve_vault'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reserve Vault</span>
        </button>

        <button
          onClick={() => setActiveSubView('funding')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeSubView === 'funding'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Landmark className="w-3.5 h-3.5 text-amber-600" />
          <span>SME Loans</span>
        </button>
      </div>

      {activeSubView === 'remittances' ? (
        <>
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search obligations, tax types, KRA..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
          </div>

          {/* Category Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Obligations List */}
          <div className="space-y-3">
            {filtered.map((item) => {
              const isUrgent = item.daysRemaining <= 2 && !item.isPaid;
              const isWarning = item.daysRemaining <= 14 && !item.isPaid && !isUrgent;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 border shadow-2xs space-y-3 transition hover:shadow-md ${
                    item.isPaid
                      ? 'border-emerald-200/80 bg-emerald-50/10'
                      : isUrgent
                      ? 'border-amber-300 bg-amber-50/10'
                      : isWarning
                      ? 'border-orange-200'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Top Details Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {item.agencyCode}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold text-slate-900">
                        KSh {item.amount.toLocaleString()}
                      </div>
                      <div className="mt-1">
                        {item.isPaid ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                          </span>
                        ) : isUrgent ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                            <ShieldAlert className="w-3 h-3 text-rose-600" /> {item.dueDate}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3 text-amber-600" /> {item.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Legal Tax Optimization Tip */}
                  {item.taxOptimizationTip && !item.isPaid && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Legal Saving Tip: </span>
                        <span>{item.taxOptimizationTip}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      {item.isPaid && item.paidAt ? `Paid on ${item.paidAt}` : 'Penalty Avoided: KSh 5,000'}
                    </span>

                    {item.isPaid ? (
                      <button
                        onClick={() => onViewReceipt(item.receiptRef || 'SHA-2026-981024')}
                        className="text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl transition"
                      >
                        View Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => onPayObligation(item)}
                        className="text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
                      >
                        <span>{item.title.includes('Permit') ? 'Renew Permit' : 'Pay Now'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : activeSubView === 'reserve_vault' ? (
        /* Reserve Savings Vault nested sub-view */
        <div className="space-y-4">
          {wallet && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-4 shadow-lg border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-extrabold tracking-wider">
                    Founder Reserve Balance
                  </span>
                  <div className="text-2xl font-black text-white mt-0.5">
                    KSh {wallet.availableBalance.toLocaleString()}
                  </div>
                </div>
                {onTopUpMpesa && (
                  <button
                    onClick={onTopUpMpesa}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1"
                  >
                    <span>M-PESA Deposit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {wallet?.vaults.map((v) => {
              const progress = Math.min(100, Math.round((v.currentAmount / v.targetAmount) * 100));

              return (
                <div key={v.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {v.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{v.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Target Due: {v.dueDate}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">
                        KSh {v.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        of KSh {v.targetAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>{progress}% Funded</span>
                    <span>Auto-Save: KSh {v.autoSaveAmount.toLocaleString()}/{v.autoSaveFrequency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* SME Funding sub-view */
        profile && scoreData && fundingOffers ? (
          <FundingScreen
            profile={profile}
            scoreData={scoreData}
            fundingOffers={fundingOffers}
            onNavigateToDocuments={onNavigateToDocuments || (() => {})}
          />
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            SME Credit Assessment unavailable. Please check Business Profile.
          </div>
        )
      )}
    </div>
  );
};

