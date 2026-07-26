import React, { useState } from 'react';
import { FounderWallet, SavingsVault } from '../../types';
import { 
  Wallet, 
  PiggyBank, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Clock, 
  Lock,
  ChevronRight,
  Calculator,
  RefreshCw
} from 'lucide-react';

interface FounderWalletScreenProps {
  wallet: FounderWallet;
  onTopUpMpesa: (amount: number, targetVaultId?: string) => void;
  onCreateVault: (vault: SavingsVault) => void;
  monthlyRentFee: number;
}

export const FounderWalletScreen: React.FC<FounderWalletScreenProps> = ({
  wallet,
  onTopUpMpesa,
  onCreateVault,
  monthlyRentFee,
}) => {
  const [topUpAmount, setTopUpAmount] = useState<string>('15000');
  const [selectedVaultForTopup, setSelectedVaultForTopup] = useState<string>('unallocated');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatingVault, setIsCreatingVault] = useState(false);

  // New Vault Form
  const [newVaultTitle, setNewVaultTitle] = useState('');
  const [newVaultTarget, setNewVaultTarget] = useState('30000');
  const [newVaultCategory, setNewVaultCategory] = useState<'rent' | 'coworking' | 'statutory' | 'permits' | 'emergency'>('coworking');

  const totalVaultsSaved = wallet.vaults.reduce((sum, v) => sum + v.currentAmount, 0);
  const totalNextMonthRequired = wallet.nextMonthLiabilitiesTotal;
  const coveragePercent = Math.min(100, Math.round((totalVaultsSaved / totalNextMonthRequired) * 100));

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topUpAmount);
    if (isNaN(val) || val <= 0) return;
    onTopUpMpesa(val, selectedVaultForTopup === 'unallocated' ? undefined : selectedVaultForTopup);
    setIsTopUpOpen(false);
  };

  const handleCreateVaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVaultTitle.trim()) return;
    const targetVal = parseFloat(newVaultTarget) || 20000;
    const newV: SavingsVault = {
      id: `vault-${Date.now()}`,
      title: newVaultTitle,
      category: newVaultCategory,
      targetAmount: targetVal,
      currentAmount: 0,
      autoSaveFrequency: 'weekly',
      autoSaveAmount: Math.round(targetVal / 4),
      dueDate: '1st of Next Month',
      isFunded: false,
    };
    onCreateVault(newV);
    setIsCreatingVault(false);
    setNewVaultTitle('');
  };

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-12">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Founder's Reserve Wallet</h1>
          <p className="text-xs text-slate-500">Zero-Shortfall Operational & Rent Savings for Founders</p>
        </div>
        <button
          onClick={() => setIsTopUpOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Top Up Wallet</span>
        </button>
      </div>

      {/* Main Balance Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-4 shadow-md border border-slate-700 space-y-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Wallet className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-slate-300">Total Treasury & Vaults</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Sole Proprietor Guard
          </span>
        </div>

        <div>
          <div className="text-2xl font-black text-white tracking-tight">
            KSh {(wallet.availableBalance + totalVaultsSaved).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
            <span>Available Balance: KSh {wallet.availableBalance.toLocaleString()}</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Locked in Vaults: KSh {totalVaultsSaved.toLocaleString()}</span>
          </p>
        </div>

        {/* Next Month Liability Coverage Bar */}
        <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Next Month Liabilities
            </span>
            <span className="font-extrabold text-emerald-400">{coveragePercent}% Funded</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                coveragePercent >= 100 ? 'bg-emerald-400' : coveragePercent >= 75 ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
              style={{ width: `${coveragePercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span>Target Required: KSh {totalNextMonthRequired.toLocaleString()}</span>
            <span>Saved: KSh {totalVaultsSaved.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* AI Founder Advice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900">Founder Cashflow Shield Active</div>
          <p className="text-[11px] text-amber-800/90 mt-0.5">
            Your monthly rent & coworking space fee is estimated at <span className="font-extrabold">KSh {monthlyRentFee.toLocaleString()}</span>. 
            Automated weekly deposits ensure you never run short on rent or KRA/SHA compliance deadlines.
          </p>
        </div>
      </div>

      {/* Vaults Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">Dedicated Expense Vaults</h2>
          <p className="text-[10px] text-slate-500">Locked savings reserved strictly for business liabilities</p>
        </div>
        <button
          onClick={() => setIsCreatingVault(true)}
          className="text-xs text-emerald-700 hover:text-emerald-800 font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200"
        >
          <Plus className="w-3 h-3" />
          <span>New Vault</span>
        </button>
      </div>

      {/* Vaults Cards Grid */}
      <div className="space-y-3">
        {wallet.vaults.map((vault) => {
          const vPercent = Math.min(100, Math.round((vault.currentAmount / vault.targetAmount) * 100));
          const isRentOrCoworking = vault.category === 'rent' || vault.category === 'coworking';

          return (
            <div
              key={vault.id}
              className={`bg-white rounded-2xl p-3.5 border shadow-2xs transition hover:shadow-md space-y-3 ${
                isRentOrCoworking ? 'border-emerald-300 bg-emerald-50/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                      isRentOrCoworking
                        ? 'bg-emerald-100 text-emerald-800'
                        : vault.category === 'statutory'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isRentOrCoworking ? (
                      <Building className="w-4 h-4" />
                    ) : (
                      <PiggyBank className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs text-slate-900">{vault.title}</h3>
                      {vault.isFunded && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Fully Saved
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Due: {vault.dueDate} • Auto-save: KSh {vault.autoSaveAmount.toLocaleString()}/wk
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900">
                    KSh {vault.currentAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">Target: KSh {vault.targetAmount.toLocaleString()}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      vPercent >= 100 ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${vPercent}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{vPercent}% of target reached</span>
                  <span>Shortfall: KSh {Math.max(0, vault.targetAmount - vault.currentAmount).toLocaleString()}</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> Capital Protected
                </span>
                <button
                  onClick={() => {
                    setSelectedVaultForTopup(vault.id);
                    setIsTopUpOpen(true);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 transition"
                >
                  Allocate Funds
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction Ledger Section */}
      <div className="space-y-2 pt-2">
        <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">Recent Reserve Movements</h2>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100">
          {wallet.transactions.map((tx) => (
            <div key={tx.id} className="p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    tx.type === 'mpesa_topup'
                      ? 'bg-emerald-100 text-emerald-800'
                      : tx.type === 'vault_deposit'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {tx.type === 'mpesa_topup' ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : tx.type === 'vault_deposit' ? (
                    <PiggyBank className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{tx.title}</div>
                  <div className="text-[10px] text-slate-400">
                    Ref: {tx.reference} • {tx.date}
                  </div>
                </div>
              </div>

              <div
                className={`text-right font-black ${
                  tx.type === 'compliance_payout' ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {tx.type === 'compliance_payout' ? '-' : '+'} KSh {tx.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* M-PESA Top-Up Drawer / Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">M-PESA Direct Reserve Top-Up</h3>
                  <p className="text-[10px] text-slate-500">STK Push to Phone</p>
                </div>
              </div>
              <button
                onClick={() => setIsTopUpOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Allocation Vault</label>
                <select
                  value={selectedVaultForTopup}
                  onChange={(e) => setSelectedVaultForTopup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="unallocated">Treasury Balance (Unallocated)</option>
                  {wallet.vaults.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title} (Target: KSh {v.targetAmount.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount (KSh)</label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[10px] text-emerald-900">
                <span className="font-bold">Instant M-PESA STK Push: </span>
                You will receive a PIN prompt on your registered Safaricom phone to authorize the deposit.
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-xs transition"
              >
                Trigger M-PESA STK Push
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Vault Creation Modal */}
      {isCreatingVault && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Create New Reserve Vault</h3>
                  <p className="text-[10px] text-slate-500">Lock funds for recurring business fees</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreatingVault(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVaultSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Vault Category</label>
                <select
                  value={newVaultCategory}
                  onChange={(e) => setNewVaultCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-800"
                >
                  <option value="coworking">Coworking Space / Office Rent</option>
                  <option value="rent">Commercial Space Lease</option>
                  <option value="statutory">Statutory Taxes (KRA/SHA/NSSF)</option>
                  <option value="permits">County Permits & Licenses</option>
                  <option value="emergency">Emergency Compliance Reserve</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Vault Title</label>
                <input
                  type="text"
                  value={newVaultTitle}
                  onChange={(e) => setNewVaultTitle(e.target.value)}
                  placeholder="e.g. Kilimani Hub Desk Rent"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Monthly Target (KSh)</label>
                <input
                  type="number"
                  value={newVaultTarget}
                  onChange={(e) => setNewVaultTarget(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl shadow-xs transition"
              >
                Create Reserved Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
