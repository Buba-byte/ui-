import React, { useState } from 'react';
import { CoverageState, ViewMode, DeviceFrame } from './types';
import { INITIAL_COVERAGE_STATE, INSURANCE_PRODUCTS } from './data/lemonadeData';
import { Header } from './components/Header';
import { MobileFrame } from './components/MobileFrame';
import { MayaChatDrawer } from './components/MayaChatDrawer';
import { BlueprintFlowView } from './components/BlueprintFlowView';
import { DesignSystemInspector } from './components/DesignSystemInspector';

// Screens
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { PersonalInfoScreen } from './components/screens/PersonalInfoScreen';
import { AddressScreen } from './components/screens/AddressScreen';
import { LivingSituationScreen } from './components/screens/LivingSituationScreen';
import { SafetySecurityScreen } from './components/screens/SafetySecurityScreen';
import { ValuablesScreen } from './components/screens/ValuablesScreen';
import { CoverageCalculatorScreen } from './components/screens/CoverageCalculatorScreen';
import { GivebackScreen } from './components/screens/GivebackScreen';
import { QuoteSummaryScreen } from './components/screens/QuoteSummaryScreen';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('iphone16');
  const [isMayaOpen, setIsMayaOpen] = useState<boolean>(false);
  const [coverageState, setCoverageState] = useState<CoverageState>(INITIAL_COVERAGE_STATE);

  const totalSteps = 9;

  const updateCoverageState = (partial: Partial<CoverageState>) => {
    setCoverageState((prev) => ({ ...prev, ...partial }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setCoverageState(INITIAL_COVERAGE_STATE);
    setCurrentStep(1);
    setViewMode('interactive');
  };

  const handleJumpToStep = (step: number) => {
    setCurrentStep(step);
    setViewMode('interactive');
  };

  const activeProduct = INSURANCE_PRODUCTS.find(
    (p) => p.id === coverageState.productType
  ) || INSURANCE_PRODUCTS[0];

  const renderActiveScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <WelcomeScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <PersonalInfoScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <AddressScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <LivingSituationScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 5:
        return (
          <SafetySecurityScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 6:
        return (
          <ValuablesScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 7:
        return (
          <CoverageCalculatorScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 8:
        return (
          <GivebackScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 9:
        return (
          <QuoteSummaryScreen
            coverageState={coverageState}
            onBack={handlePrevStep}
            onReset={handleReset}
          />
        );
      default:
        return (
          <WelcomeScreen
            coverageState={coverageState}
            updateState={updateCoverageState}
            onNext={handleNextStep}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased selection:bg-[#FF0083] selection:text-white">
      {/* App Header */}
      <Header
        currentStep={currentStep}
        totalSteps={totalSteps}
        viewMode={viewMode}
        setViewMode={setViewMode}
        deviceFrame={deviceFrame}
        setDeviceFrame={setDeviceFrame}
        onOpenMayaChat={() => setIsMayaOpen(true)}
        onReset={handleReset}
        onJumpToStep={handleJumpToStep}
        productTitle={activeProduct.title}
      />

      {/* Main View Port Container */}
      <main className="flex-1 flex flex-col justify-center">
        {viewMode === 'interactive' && (
          <div className="w-full flex-1 flex items-center justify-center py-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
            <MobileFrame frameType={deviceFrame} currentStep={currentStep}>
              {renderActiveScreen()}
            </MobileFrame>
          </div>
        )}

        {viewMode === 'blueprint' && (
          <BlueprintFlowView
            coverageState={coverageState}
            updateState={updateCoverageState}
            onJumpToStep={handleJumpToStep}
          />
        )}

        {viewMode === 'design-system' && <DesignSystemInspector />}
      </main>

      {/* AI Maya Drawer */}
      <MayaChatDrawer
        isOpen={isMayaOpen}
        onClose={() => setIsMayaOpen(false)}
        coverageState={coverageState}
      />
    </div>
  );
}
