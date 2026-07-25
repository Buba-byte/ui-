import React, { useState } from 'react';
import { CoverageState, ValuableItem } from '../../types';
import { Laptop, Gem, Camera, Bike, ShieldCheck, Plus, Trash2, ArrowLeft, ArrowRight, X, Sparkles } from 'lucide-react';

interface ValuablesScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ValuablesScreen: React.FC<ValuablesScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ValuableItem['category']>('Electronics');
  const [newItemValue, setNewItemValue] = useState(1500);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const item: ValuableItem = {
      id: `val-${Date.now()}`,
      category: newItemCategory,
      name: newItemName,
      estimatedValue: Number(newItemValue)
    };
    updateState({
      valuableItems: [...coverageState.valuableItems, item]
    });
    setNewItemName('');
    setShowAddModal(false);
  };

  const handleRemoveItem = (id: string) => {
    updateState({
      valuableItems: coverageState.valuableItems.filter((item) => item.id !== id)
    });
  };

  const totalValuablesValue = coverageState.valuableItems.reduce(
    (sum, item) => sum + item.estimatedValue,
    0
  );

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white relative">
      <div className="space-y-4">
        {/* Top Back Navigation & Step Tag */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-bold text-[#FF0083] uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
            Step 5: High-Value Items
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
              "Do you own expensive tech, jewelry, or cameras worth over $1,500? Add them here for worldwide $0 deductible protection."
            </p>
          </div>
        </div>

        {/* Total Scheduled Valuables Banner */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Zero-Deductible Extra Coverage</span>
            <p className="text-xs font-bold text-pink-300">
              {coverageState.valuableItems.length} Items Listed (${totalValuablesValue.toLocaleString()})
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#FF0083] hover:bg-pink-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Added Items List */}
        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
          {coverageState.valuableItems.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
              <Sparkles className="w-6 h-6 mx-auto mb-1 text-pink-400" />
              <p className="text-xs font-semibold text-slate-600">No scheduled items added yet</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Laptops, watches, rings, and bikes qualify for $0 deductible coverage.</p>
            </div>
          ) : (
            coverageState.valuableItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#FF0083] flex items-center justify-center font-bold">
                    {item.category === 'Jewelry' ? (
                      <Gem className="w-4 h-4" />
                    ) : item.category === 'Cameras' ? (
                      <Camera className="w-4 h-4" />
                    ) : item.category === 'Bicycles' ? (
                      <Bike className="w-4 h-4" />
                    ) : (
                      <Laptop className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-medium">{item.category} • ${item.estimatedValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    $0 Deductible
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-30 p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-5 w-full shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Add High-Value Item</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Item Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as ValuableItem['category'])}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5"
                >
                  <option value="Electronics">Electronics (MacBook, iPad)</option>
                  <option value="Jewelry">Jewelry & Watches</option>
                  <option value="Cameras">Camera Gear & Lenses</option>
                  <option value="Bicycles">Electric Bikes & Bicycles</option>
                  <option value="Fine Art">Fine Art & Collectibles</option>
                  <option value="Musical Instruments">Musical Instruments</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Item Name / Model
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. MacBook Pro 16 Inch"
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Estimated Value ($)
                </label>
                <input
                  type="number"
                  value={newItemValue}
                  onChange={(e) => setNewItemValue(Number(e.target.value))}
                  step={100}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5"
                />
              </div>
            </div>

            <button
              onClick={handleAddItem}
              className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3 rounded-full text-xs shadow-md"
            >
              Save Item
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={onNext}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Next: Customize Coverage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
