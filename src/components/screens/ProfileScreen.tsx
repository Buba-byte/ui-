import React, { useState } from 'react';
import { BusinessProfile, FounderWallet } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Smartphone, 
  Fingerprint, 
  ExternalLink,
  Wallet,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface ProfileScreenProps {
  profile: BusinessProfile;
  profiles: BusinessProfile[];
  wallet: FounderWallet;
  onSelectProfile: (profile: BusinessProfile) => void;
  onResetData: () => void;
  onTopUpMpesa: () => void;
  onCreateVault: (title: string, targetAmount: number, category: 'rent' | 'statutory' | 'permits' | 'emergency') => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  profiles,
  wallet,
  onSelectProfile,
  onResetData,
  onTopUpMpesa,
  onCreateVault,
}) => {
  const [activeProfileSubTab, setActiveProfileSubTab] = useState<'details' | 'vault' | 'security'>('details');

  // Vault creation modal state inside profile
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [vaultTitle, setVaultTitle] = useState('');
  const [vaultAmount, setVaultAmount] = useState('');
  const [vaultCategory, setVaultCategory] = useState<'rent' | 'statutory' | 'permits' | 'emergency'>('rent');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultTitle || !vaultAmount) return;
    onCreateVault(vaultTitle, Number(vaultAmount), vaultCategory);
    setVaultTitle('');
    setVaultAmount('');
    setShowCreateModal(false);
  };

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Business Profile & Vault</h1>
          <p className="text-xs text-slate-500">Government Portal Identity & Founder Reserve Savings</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 font-extrabold flex items-center justify-center text-sm shadow-2xs">
          {profile.name.charAt(0)}
        </div>
      </div>

      {/* Sub-Tab Navigation Bar inside Profile */}
      <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 text-xs font-extrabold">
        <button
          onClick={() => setActiveProfileSubTab('details')}
          className={`flex-1 py-2 rounded-xl transition text-center ${
            activeProfileSubTab === 'details'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Business Identity
        </button>
        <button
          onClick={() => setActiveProfileSubTab('vault')}
          className={`flex-1 py-2 rounded-xl transition text-center flex items-center justify-center gap-1 ${
            activeProfileSubTab === 'vault'
              ? 'bg-white text-emerald-900 shadow-xs font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reserve Vault</span>
        </button>
        <button
          onClick={() => setActiveProfileSubTab('security')}
          className={`flex-1 py-2 rounded-xl transition text-center ${
            activeProfileSubTab === 'security'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Security
        </button>
      </div>

      {/* TAB 1: BUSINESS IDENTITY & CONNECTED PORTALS */}
      {activeProfileSubTab === 'details' && (
        <div className="space-y-4">
          {/* Main Profile Info Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Business</div>
                <h2 className="text-base font-extrabold text-slate-900 mt-0.5">{profile.name}</h2>
                <p className="text-xs text-emerald-700 font-semibold">{profile.industry}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {profile.businessType}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">KRA PIN</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{profile.kraPin}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">BRS Registration No</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{profile.registrationNo}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">National ID (Owner)</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{profile.nationalId}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Registered County</span>
                <span className="font-bold text-slate-900 text-xs truncate block">{profile.county}</span>
              </div>
            </div>
          </div>

          {/* Connected Government Services Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">Connected Government Portals</h2>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Auto-Sync Active
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100">
              {profile.connectedServices.map((service) => (
                <div key={service.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {service.agencyCode}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <span>{service.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-400">{service.identifier}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    {service.status === 'connected' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" /> Action Req
                      </span>
                    )}
                    <p className="text-[9px] text-slate-400 mt-0.5">{service.lastSync}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NESTED FOUNDER'S RESERVE VAULT */}
      {activeProfileSubTab === 'vault' && (
        <div className="space-y-4">
          {/* Reserve Wallet Summary Card */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-4 shadow-lg border border-emerald-700/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-200 uppercase font-extrabold tracking-wider">
                  Founder Reserve Wallet
                </span>
                <div className="text-2xl font-black text-white mt-0.5">
                  KSh {wallet.availableBalance.toLocaleString()}
                </div>
              </div>
              <button
                onClick={onTopUpMpesa}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1"
              >
                <span>M-PESA Top-Up</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-700/40">
              <div className="bg-emerald-950/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Locked In Vaults</span>
                <span className="font-extrabold text-white">KSh {wallet.totalSavedInVaults.toLocaleString()}</span>
              </div>
              <div className="bg-emerald-950/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Upcoming Month Buffer</span>
                <span className="font-extrabold text-emerald-300">{wallet.coverageRatioPercent}% Covered</span>
              </div>
            </div>
          </div>

          {/* Dedicated Vault List Header */}
          <div className="flex items-center justify-between px-0.5">
            <div>
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">Dedicated Savings Vaults</h2>
              <p className="text-[11px] text-slate-500">Rent, Coworking desk, & Tax sinking funds</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>New Vault</span>
            </button>
          </div>

          {/* Vault Items */}
          <div className="space-y-3">
            {wallet.vaults.map((vault) => {
              const progress = Math.min(100, Math.round((vault.currentAmount / vault.targetAmount) * 100));

              return (
                <div key={vault.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {vault.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">{vault.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Target Due: {vault.dueDate}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">
                        KSh {vault.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        of KSh {vault.targetAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                      <span>{progress}% Funded</span>
                      <span>Auto-Save: KSh {vault.autoSaveAmount.toLocaleString()}/{vault.autoSaveFrequency}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY & APP SETTINGS */}
      {activeProfileSubTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
            <h2 className="font-extrabold text-sm text-slate-900 tracking-tight border-b border-slate-100 pb-2">
              Security & Approvals
            </h2>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">M-PESA Express Authorization</div>
                  <div className="text-[10px] text-slate-400">Registered: {profile.mpesaPhone}</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <Fingerprint className="w-4 h-4 text-slate-600" />
                <div>
                  <div className="font-bold text-slate-900">Biometric Login & Payments</div>
                  <div className="text-[10px] text-slate-400">FaceID / TouchID Authorization</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.biometricsEnabled}
                onChange={() => {}}
                className="accent-emerald-600 w-4 h-4 rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onResetData}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Reset Demo Application State</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal for creating vault from profile */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900">Create Dedicated Vault</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Vault Name</label>
                <input
                  type="text"
                  placeholder="e.g. Next Month Office Rent"
                  value={vaultTitle}
                  onChange={(e) => setVaultTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Amount (KSh)</label>
                <input
                  type="number"
                  placeholder="45000"
                  value={vaultAmount}
                  onChange={(e) => setVaultAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={vaultCategory}
                  onChange={(e) => setVaultCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
                >
                  <option value="rent">Office Rent & Coworking Desk</option>
                  <option value="statutory">KRA / SHA Tax Sinking Fund</option>
                  <option value="permits">County Permit Renewal Fund</option>
                  <option value="emergency">Emergency Operating Buffer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-extrabold py-3 rounded-xl shadow-xs transition"
              >
                Create Reserve Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

