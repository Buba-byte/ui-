import React, { useState, useEffect } from 'react';
import { CoverageState } from '../../types';
import { GIVEBACK_CHARITIES, INSURANCE_PRODUCTS } from '../../data/lemonadeData';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowLeft, Download, FileText, Lock, PartyPopper } from 'lucide-react';

interface QuoteSummaryScreenProps {
  coverageState: CoverageState;
  onBack: () => void;
  onReset: () => void;
}

export const QuoteSummaryScreen: React.FC<QuoteSummaryScreenProps> = ({
  coverageState,
  onBack,
  onReset
}) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [signed, setSigned] = useState(false);
  const [policyActivated, setPolicyActivated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const selectedCharity = GIVEBACK_CHARITIES.find(
    (c) => c.id === coverageState.selectedCharityId
  ) || GIVEBACK_CHARITIES[0];

  const productInfo = INSURANCE_PRODUCTS.find(
    (p) => p.id === coverageState.productType
  ) || INSURANCE_PRODUCTS[0];

  if (analyzing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5 bg-white">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-pink-100 border-t-[#FF0083] animate-spin flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#FF0083] text-white font-serif font-bold text-2xl flex items-center justify-center shadow-lg">
              M
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-xs">
          <h3 className="font-extrabold text-slate-900 text-lg">AI Maya is calculating your quote...</h3>
          <p className="text-xs text-slate-500">
            Cross-referencing property risks at {coverageState.address.split(',')[0]} and applying active safety discounts.
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-[11px] text-slate-600 font-medium">
          <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Building Risk Assessment: Low</span>
          </div>
          <div className="flex items-center space-x-2 text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>{coverageState.discountPercentage || 15}% Safety Discount Applied</span>
          </div>
        </div>
      </div>
    );
  }

  if (policyActivated) {
    return (
      <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-pink-50 via-white to-white text-center">
        <div className="space-y-5 my-auto">
          <div className="w-20 h-20 bg-[#FF0083] text-white rounded-full flex items-center justify-center mx-auto shadow-xl ring-4 ring-pink-200 animate-bounce">
            <PartyPopper className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#FF0083] bg-pink-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Policy #LEM-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">You're Covered!</h2>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your {productInfo.title} is now active starting today. Policy documents have been emailed to {coverageState.email}.
            </p>
          </div>

          {/* Certificate Card Mockup */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl text-left space-y-3 shadow-lg">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-serif italic text-lg text-pink-400 font-bold">Lemonade</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-2 py-0.5 rounded">ACTIVE</span>
            </div>
            <div className="text-xs space-y-1">
              <p className="text-slate-300"><strong className="text-white">Insured:</strong> {coverageState.firstName} {coverageState.lastName}</p>
              <p className="text-slate-300"><strong className="text-white">Property:</strong> {coverageState.address}</p>
              <p className="text-slate-300"><strong className="text-white">Personal Property:</strong> ${coverageState.personalPropertyLimit.toLocaleString()}</p>
              <p className="text-slate-300"><strong className="text-white">Giveback Beneficiary:</strong> {selectedCharity.name}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <button
            onClick={() => alert("Downloading digital insurance certificate PDF...")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-full text-xs flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Insurance Proof Certificate</span>
          </button>

          <button
            onClick={onReset}
            className="w-full text-slate-500 hover:text-slate-800 font-semibold py-2 text-xs"
          >
            Start New Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white">
      <div className="space-y-4">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-[#FF0083] uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
            Final Step: Policy Review
          </span>
        </div>

        {/* AI Maya Final Quote Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
            <div>
              <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">{productInfo.title}</span>
              <h3 className="text-xl font-extrabold">${coverageState.monthlyPrice.toFixed(2)} <span className="text-xs font-normal text-slate-300">/ month</span></h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FF0083] text-white font-serif font-bold text-xl flex items-center justify-center shadow-md">
              M
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">Property Limit</span>
              <span className="font-bold text-slate-100">${coverageState.personalPropertyLimit.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Deductible</span>
              <span className="font-bold text-slate-100">${coverageState.deductible}</span>
            </div>
          </div>
        </div>

        {/* Itemized Policy Breakdown */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Quote Itemization</h4>
          <div className="flex justify-between text-slate-600">
            <span>Base {productInfo.title}</span>
            <span>$8.50/mo</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Liability (${coverageState.personalLiabilityLimit.toLocaleString()})</span>
            <span>+$2.20/mo</span>
          </div>
          {coverageState.valuableItems.length > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>{coverageState.valuableItems.length} Scheduled Valuables</span>
              <span>+$3.00/mo</span>
            </div>
          )}
          <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-1.5 rounded-lg">
            <span>Safety System Discounts</span>
            <span>-{coverageState.discountPercentage || 15}%</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-slate-900 text-sm">
            <span>Total Monthly Payment</span>
            <span className="text-[#FF0083]">${coverageState.monthlyPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Selected Giveback Charity Badge */}
        <div className="p-3 bg-pink-50/80 border border-pink-200 rounded-2xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#FF0083] text-white flex items-center justify-center font-bold text-xs shrink-0">
            ♥
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#FF0083] uppercase">Your Giveback Charity</span>
            <p className="text-xs font-bold text-slate-900">{selectedCharity.name}</p>
          </div>
        </div>

        {/* Digital Sign-on-Screen Section */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-xs font-bold text-slate-800">
            Sign to Activate Policy
          </label>
          <button
            onClick={() => setSigned(!signed)}
            className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
              signed
                ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold'
                : 'border-slate-300 bg-white text-slate-600'
            }`}
          >
            <div className="flex items-center space-x-2 text-xs">
              <FileText className="w-4 h-4 text-[#FF0083]" />
              <span>{signed ? `Digitally signed by ${coverageState.firstName} ${coverageState.lastName}` : 'Tap here to sign policy declaration'}</span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                signed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
              }`}
            >
              {signed && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Final Checkout CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={() => {
            if (!signed) {
              setSigned(true);
            }
            setPolicyActivated(true);
          }}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-extrabold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/30 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <Lock className="w-4 h-4" />
          <span>Pay ${coverageState.monthlyPrice.toFixed(2)} & Activate Policy</span>
        </button>
      </div>
    </div>
  );
};
