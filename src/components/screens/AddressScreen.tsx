import React, { useState } from 'react';
import { CoverageState } from '../../types';
import { MapPin, Building, Home, ArrowLeft, ArrowRight, Check, Compass, Layers } from 'lucide-react';

interface AddressScreenProps {
  coverageState: CoverageState;
  updateState: (partial: Partial<CoverageState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AddressScreen: React.FC<AddressScreenProps> = ({
  coverageState,
  updateState,
  onNext,
  onBack
}) => {
  const [addressSearch, setAddressSearch] = useState(coverageState.address);

  const buildingTypes: { id: CoverageState['buildingType']; label: string; icon: string }[] = [
    { id: 'apartment', label: 'Apartment', icon: 'Building' },
    { id: 'condo', label: 'Condo', icon: 'Layers' },
    { id: 'single_family', label: 'House', icon: 'Home' },
    { id: 'townhouse', label: 'Townhouse', icon: 'Building' },
  ];

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
            Step 2: Location
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
              "Where is your home located? I’ll cross-reference building materials, local weather risks, and crime data."
            </p>
          </div>
        </div>

        {/* Street Address Input */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Street Address
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#FF0083] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={addressSearch}
              onChange={(e) => {
                setAddressSearch(e.target.value);
                updateState({ address: e.target.value });
              }}
              placeholder="Enter your street address..."
              className="w-full pl-10 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pr-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
            />
          </div>
        </div>

        {/* Interactive Location Pinpoint Map Canvas */}
        <div className="relative h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 flex items-center justify-center">
          {/* Mock Map Background Grid with streets */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-200">
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-300 transform -rotate-12"></div>
            <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-slate-300 transform rotate-6"></div>
            <div className="absolute right-1/4 top-0 bottom-0 w-2 bg-slate-300"></div>
          </div>

          {/* Radar Ring */}
          <div className="w-24 h-24 rounded-full border border-pink-400/40 bg-pink-500/10 animate-ping absolute"></div>

          {/* Central Property Pin Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-[#FF0083] text-white p-2.5 rounded-full shadow-lg border-2 border-white animate-bounce">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="bg-slate-900/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md mt-1 backdrop-blur-xs">
              {addressSearch.split(',')[0] || 'Selected Location'}
            </div>
          </div>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md text-[9px] font-bold text-slate-600 flex items-center space-x-1 border border-slate-200">
            <Compass className="w-3 h-3 text-[#FF0083]" />
            <span>Risk Zone Assessed</span>
          </div>
        </div>

        {/* Building Type Selector */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-semibold text-slate-700">
            Building Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {buildingTypes.map((type) => {
              const isSelected = coverageState.buildingType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => updateState({ buildingType: type.id })}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-[#FF0083] bg-pink-50/60 font-bold text-slate-900 ring-1 ring-[#FF0083]/30'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs">{type.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-[#FF0083] border-[#FF0083] text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Floor Level Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Floor Level
          </label>
          <select
            value={coverageState.floorLevel || '4th Floor'}
            onChange={(e) => updateState({ floorLevel: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
          >
            <option value="Ground Floor">Ground Floor / Basements</option>
            <option value="2nd - 3rd Floor">2nd - 3rd Floor</option>
            <option value="4th Floor">4th Floor (Standard)</option>
            <option value="5th - 10th Floor">5th - 10th Floor</option>
            <option value="11th Floor +">11th Floor or Higher (Penthouse)</option>
          </select>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 pb-2">
        <button
          onClick={onNext}
          className="w-full bg-[#FF0083] hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 text-sm transition-all"
        >
          <span>Next: Household Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
