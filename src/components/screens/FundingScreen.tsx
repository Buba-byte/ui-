import React, { useState } from 'react';
import { BusinessProfile, ComplianceScoreBreakdown, FundingOffer } from '../../types';
import { 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Building, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  Lock, 
  Clock, 
  AlertCircle,
  Award,
  ChevronRight,
  Download
} from 'lucide-react';

interface FundingScreenProps {
  profile: BusinessProfile;
  scoreData: ComplianceScoreBreakdown;
  fundingOffers: FundingOffer[];
  onNavigateToDocuments: () => void;
}

export const FundingScreen: React.FC<FundingScreenProps> = ({
  profile,
  scoreData,
  fundingOffers,
  onNavigateToDocuments,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [applyingOffer, setApplyingOffer] = useState<FundingOffer | null>(null);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  // Dynamic eligibility calculations based on tax returns & compliance score
  const score = scoreData.overallScore;
  const isEligibleForPreApproved = score >= 80;
  const estimatedCreditLimit = Math.round((profile.monthlyTurnoverEstimate || 450000) * 3 * (score / 100));

  const categories = ['All', 'Government Grant', 'SME Bank Credit', 'Microfinance'];

  const filteredOffers = fundingOffers.filter((o) => {
    if (selectedCategory === 'All') return true;
    return o.category === selectedCategory;
  });

  const handleApplyClick = (offer: FundingOffer) => {
    setApplyingOffer(offer);
    setIsApplicationSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplicationSubmitted(true);
  };

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tax-Verified SME Funding</h1>
          <p className="text-xs text-slate-500">Filings & Returns-based Loan & Grant Eligibility</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs border border-emerald-200">
          <Banknote className="w-4 h-4 text-emerald-700" />
        </div>
      </div>

      {/* Instant Funding Eligibility Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-4 shadow-lg border border-slate-800 space-y-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-200">Instant Filing Credit Assessment</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> KRA Verified
          </span>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Pre-Approved Business Credit Limit
          </div>
          <div className="text-2xl font-black text-white tracking-tight mt-0.5">
            KSh {estimatedCreditLimit.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Based on {score}% Compliance Score & verified KRA returns filings.</span>
          </p>
        </div>

        {/* Breakdown bar */}
        <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="text-[9px] text-slate-400 block">KRA Tax History</span>
            <span className="font-extrabold text-emerald-400">Clean (100%)</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block">BRS & CR12</span>
            <span className="font-extrabold text-white">Verified</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block">Credit Risk</span>
            <span className="font-extrabold text-emerald-300">Low Risk</span>
          </div>
        </div>
      </div>

      {/* AI Smart Advice Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5 shadow-2xs">
        <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-emerald-900">How Tax Filings Unlock Funding</div>
          <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
            Kenyan banks (KCB, Equity, Stanchart) and Government Funds auto-verify your ComplyKE e-Receipts & KRA Tax Compliance Certificates. Filing on time boosts your credit rating by up to 35%.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
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

      {/* Funding Offers List */}
      <div className="space-y-3">
        {filteredOffers.map((offer) => {
          const isMatched = score >= offer.eligibilityScoreRequired;

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-2xl p-4 border shadow-2xs space-y-3 transition hover:shadow-md ${
                offer.isPreApproved ? 'border-emerald-300 bg-emerald-50/10' : 'border-slate-200'
              }`}
            >
              {/* Offer Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {offer.providerLogoText}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.2 rounded-md">
                        {offer.category}
                      </span>
                      {offer.isPreApproved && (
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Pre-Approved
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{offer.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{offer.provider}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900">
                    Up to KSh {offer.maxAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5">{offer.interestRate}</div>
                </div>
              </div>

              {/* Offer Description */}
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {offer.description}
              </p>

              {/* Required Documents Badges */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-500">Auto-Attached Compliance Documents:</div>
                <div className="flex flex-wrap gap-1">
                  {offer.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">
                  Tenure: <span className="font-bold text-slate-800">{offer.tenureMonths}</span>
                </div>

                <button
                  onClick={() => handleApplyClick(offer)}
                  className="text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <span>Apply with Verified Filings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Drawer Modal */}
      {applyingOffer && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{applyingOffer.title}</h3>
                  <p className="text-[10px] text-slate-500">Instant Application via ComplyKE</p>
                </div>
              </div>
              <button
                onClick={() => setApplyingOffer(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {isApplicationSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-600 leading-relaxed px-2">
                  Your <span className="font-bold">KRA Tax Compliance Certificate</span> and <span className="font-bold">BRS CR12 Document</span> have been securely transmitted to {applyingOffer.provider}. Expect payout notification on M-PESA within 2 hours.
                </p>
                <button
                  onClick={() => setApplyingOffer(null)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl transition text-xs mt-2"
                >
                  Return to Workspace
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-3 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1.5">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Verified Data Dossier Auto-Attached</span>
                  </div>
                  <ul className="text-[10px] text-emerald-800 space-y-0.5 list-disc pl-4">
                    <li>KRA PIN: {profile.kraPin} (Active Status)</li>
                    <li>BRS Registration: {profile.registrationNo}</li>
                    <li>Compliance Rating: {score}% Clean History</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Requested Funding Amount (KSh)</label>
                  <input
                    type="number"
                    defaultValue={Math.min(applyingOffer.maxAmount, estimatedCreditLimit)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Primary Funding Purpose</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800">
                    <option>Working Capital & Payroll</option>
                    <option>Inventory & Stock Purchase</option>
                    <option>Office & Coworking Expansion</option>
                    <option>Equipment & Technology Upgrade</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-xs transition"
                >
                  Confirm & Submit Pre-Approved Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
