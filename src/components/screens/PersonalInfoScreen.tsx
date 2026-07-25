import React, { useState } from 'react';
import { CoverageState } from '../../types';
import { User, Mail, Calendar, Phone, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

interface PersonalInfoScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!coverageState.firstName.trim()) errs.firstName = 'First name is required';
    if (!coverageState.lastName.trim()) errs.lastName = 'Last name is required';
    if (!coverageState.email.trim() || !coverageState.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white">
      <div className="space-y-5">
        {/* Top Back Navigation & Step Tag */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-[#FF0083] uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
            Step 1: Identity
          </span>
        </div>

        {/* AI Maya Chat Message Bubble */}
        <div className="flex items-start space-x-3 bg-pink-50/70 p-4 rounded-2xl border border-pink-100">
          <div className="w-10 h-10 rounded-full bg-[#FF0083] text-white font-serif font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            M
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#FF0083]">AI Maya</span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              "Nice to meet you! Let’s start with your name and email so I can prepare your custom policy options."
            </p>
          </div>
        </div>

        {/* Form Inputs Container */}
        <div className="space-y-4 pt-2">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={coverageState.firstName}
                  onChange={(e) => updateState({ firstName: e.target.value })}
                  placeholder="Alex"
                  className={`w-full bg-slate-50 border text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083] ${
                    errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={coverageState.lastName}
                  onChange={(e) => updateState({ lastName: e.target.value })}
                  placeholder="Morgan"
                  className={`w-full bg-slate-50 border text-slate-900 text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083] ${
                    errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={coverageState.email}
                onChange={(e) => updateState({ email: e.target.value })}
                placeholder="alex.morgan@example.com"
                className={`w-full pl-10 bg-slate-50 border text-slate-900 text-sm rounded-xl pr-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083] ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={coverageState.phone}
                onChange={(e) => updateState({ phone: e.target.value })}
                placeholder="(555) 234-5678"
                className="w-full pl-10 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pr-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="date"
                value={coverageState.dateOfBirth}
                onChange={(e) => updateState({ dateOfBirth: e.target.value })}
                className="w-full pl-10 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pr-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
              />
            </div>
          </div>
        </div>

        {/* Security / Privacy Assurance */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>256-bit encrypted. We never share or sell your email address.</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleContinue}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Next: Property Location</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
