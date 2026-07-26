import React, { useState } from 'react';
import { BusinessProfile, BusinessStage, ConnectedService, StartupDocumentStep } from '../../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Rocket, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Lock, 
  ExternalLink, 
  Bot, 
  PiggyBank, 
  FileText,
  HelpCircle
} from 'lucide-react';

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteOnboarding: (
    profile: BusinessProfile,
    stage: BusinessStage,
    rentFee: number
  ) => void;
}

export const AuthOnboardingModal: React.FC<AuthOnboardingModalProps> = ({
  isOpen,
  onClose,
  onCompleteOnboarding,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [phone, setPhone] = useState('0722123456');
  const [nationalId, setNationalId] = useState('28491029');
  const [pin, setPin] = useState('1234');
  const [ownerName, setOwnerName] = useState('John Kamau');

  // Business Stage
  const [stage, setStage] = useState<BusinessStage>('startup');
  const [businessName, setBusinessName] = useState('Kilimani Tech Ventures');
  const [industry, setIndustry] = useState('Software & IT Services');
  const [businessType, setBusinessType] = useState<'SME' | 'Private Limited (Ltd)' | 'Sole Proprietorship' | 'Partnership'>('Sole Proprietorship');
  const [county, setCounty] = useState('Nairobi City County');
  const [kraPinInput, setKraPinInput] = useState('A019283746Z');
  const [monthlyRent, setMonthlyRent] = useState('35000');

  // Selected Services for Existing Business
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'KRA iTax Portal',
    'Social Health Authority (SHA)',
    'Nairobi Unified Portal'
  ]);

  const toggleService = (sName: string) => {
    setSelectedServices((prev) =>
      prev.includes(sName) ? prev.filter((x) => x !== sName) : [...prev, sName]
    );
  };

  const handleFinish = () => {
    const connectedServicesList: ConnectedService[] = selectedServices.map((name, idx) => ({
      id: `cs-onb-${idx}`,
      name,
      portalName: `${name} Official Portal`,
      agencyCode: name.includes('KRA') ? 'KRA' : name.includes('SHA') ? 'SHA' : name.includes('NSSF') ? 'NSSF' : 'COUNTY',
      status: 'connected',
      lastSync: 'Just now',
      identifier: name.includes('KRA') ? `PIN: ${kraPinInput}` : `Ref: ${Math.floor(100000 + Math.random() * 900000)}`,
    }));

    const newProfile: BusinessProfile = {
      id: `biz-new-${Date.now()}`,
      name: businessName || 'My Kenyan Business',
      registrationNo: stage === 'existing' ? 'PVT-NEW9821' : 'Pending Incorporation',
      kraPin: stage === 'existing' ? kraPinInput : 'Pending Registration',
      nationalId,
      ownerName,
      industry,
      businessType,
      stage,
      county,
      employeesCount: stage === 'existing' ? 5 : 1,
      monthlyTurnoverEstimate: 350000,
      connectedServices: connectedServicesList,
      mpesaPhone: phone,
      securityPINSet: true,
      biometricsEnabled: true,
      rentOrCoworkingMonthly: parseFloat(monthlyRent) || 35000,
    };

    onCompleteOnboarding(newProfile, stage, parseFloat(monthlyRent) || 35000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm">
              C
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>ComplyKE Setup</span>
                <span className="text-[10px] bg-emerald-900 text-emerald-300 font-bold px-1.5 py-0.2 rounded-md">
                  Kenya Law 2026
                </span>
              </h2>
              <p className="text-[10px] text-slate-400">Government Remittance & Legal Assistant</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold bg-slate-800 px-2 py-0.5 rounded-lg">
            Step {step} of 4
          </span>
        </div>

        {/* Step 1: Verification & Identity */}
        {step === 1 && (
          <div className="p-5 space-y-4 text-xs">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Sign In / First Time Verification</h3>
              <p className="text-slate-500 text-[11px]">
                Verify your Kenyan Identity to securely connect government portals & reserve wallets.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Legal Name (Owner)</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. John Kamau"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">National ID Number</label>
                  <input
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="e.g. 28491029"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">M-PESA Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0722123456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Create 4-Digit Security PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center font-mono text-lg font-bold tracking-widest text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Continue to Stage Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Choose Business Stage (Startup vs Existing) */}
        {step === 2 && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">What is your current business stage?</h3>
              <p className="text-slate-500 text-[11px]">
                ComplyKE adapts specifically depending on whether you are launching or already registered.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option A: New Startup */}
              <div
                onClick={() => setStage('startup')}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                  stage === 'startup'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl font-bold shrink-0 ${stage === 'startup' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>New Startup / Launching</span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-md">
                      AI Guided
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                    ComplyAI will guide you step-by-step on the required legal documents (BRS, KRA PIN, Permit, SHA/NSSF) and how to get them.
                  </p>
                </div>
              </div>

              {/* Option B: Existing Business */}
              <div
                onClick={() => setStage('existing')}
                className={`cursor-pointer p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                  stage === 'existing'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl font-bold shrink-0 ${stage === 'existing' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>Existing Registered Business</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                      Auto-Connect
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                    Connect your existing accounts on KRA iTax, SHA Portal, NSSF, and County Portal for automated deadline tracking.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Business Details & Document Setup */}
        {step === 3 && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {stage === 'startup' ? 'Describe Your New Startup' : 'Connect Existing Business'}
              </h3>
              <p className="text-slate-500 text-[11px]">
                {stage === 'startup'
                  ? 'Our AI will generate your legal compliance roadmap.'
                  : 'Link your registered government tax and portal identifiers.'}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Kilimani Tech Ventures"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
                  >
                    <option value="Software & IT Services">IT & Software</option>
                    <option value="Restaurant & Hospitality">Restaurant & Cafe</option>
                    <option value="Retail & E-commerce">Retail & Shop</option>
                    <option value="Consulting & Legal">Consulting & Services</option>
                    <option value="Manufacturing & Food">Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800"
                  >
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Private Limited (Ltd)">Private Limited (Ltd)</option>
                    <option value="Partnership">Partnership</option>
                    <option value="SME">SME</option>
                  </select>
                </div>
              </div>

              {stage === 'existing' ? (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">KRA Business PIN</label>
                  <input
                    type="text"
                    value={kraPinInput}
                    onChange={(e) => setKraPinInput(e.target.value)}
                    placeholder="e.g. A019283746Z"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <span>AI Guidance Enabled</span>
                  </div>
                  <p className="text-[10px] text-emerald-800">
                    Because you selected <span className="font-bold">New Startup</span>, ComplyKE will prepare step-by-step guides for obtaining your BRS Incorporation, KRA PIN, SHA, and County Permit.
                  </p>
                </div>
              )}

              {stage === 'existing' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Portals to Connect</label>
                  <div className="space-y-1.5">
                    {[
                      'KRA iTax Portal',
                      'Social Health Authority (SHA)',
                      'NSSF Pension Portal',
                      'Nairobi Unified Portal (County)',
                      'BRS eCitizen Service'
                    ].map((sName) => (
                      <label key={sName} className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(sName)}
                          onChange={() => toggleService(sName)}
                          className="accent-emerald-600 rounded"
                        />
                        <span>{sName}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>Setup Founder Wallet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Founder's Reserve Wallet & Rent Reserve */}
        {step === 4 && (
          <div className="p-5 space-y-4 text-xs">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center font-bold shadow-2xs">
                <PiggyBank className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Founder's Reserve Wallet Setup</h3>
              <p className="text-slate-500 text-[11px]">
                Save monthly for your rent, coworking space, and statutory taxes so you never run short.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Monthly Rent / Coworking Space Fee (KSh)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">Auto-Save Calculation</span>
                  <span className="text-emerald-400 font-extrabold">
                    KSh {Math.round((parseFloat(monthlyRent) || 35000) / 4).toLocaleString()} / week
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Setting aside <span className="text-white font-bold">KSh {Math.round((parseFloat(monthlyRent) || 35000) / 4).toLocaleString()}</span> every week into your locked Rent Vault guarantees 100% coverage on the 1st of every month.
                </p>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Launch ComplyKE Workspace</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
