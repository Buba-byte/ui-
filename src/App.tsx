import React, { useState } from 'react';
import { 
  NavTab, 
  DeviceFrame, 
  BusinessProfile, 
  ObligationItem, 
  DocumentItem, 
  NotificationItem,
  FounderWallet,
  SavingsVault,
  StartupDocumentStep,
  WalletTransaction,
  FundingOffer,
  NewsFeedItem
} from './types';
import { 
  DEMO_BUSINESS_PROFILES, 
  INITIAL_OBLIGATIONS, 
  INITIAL_DOCUMENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_COMPLIANCE_SCORE, 
  INITIAL_SUMMARY,
  INITIAL_FOUNDER_WALLET,
  STARTUP_LEGAL_ROADMAP,
  INITIAL_FUNDING_OFFERS,
  INITIAL_NEWS_FEEDS
} from './data/complianceData';

import { Header } from './components/Header';
import { MobileFrame } from './components/MobileFrame';
import { BottomNav } from './components/BottomNav';

import { HomeScreen } from './components/screens/HomeScreen';
import { PaymentsScreen } from './components/screens/PaymentsScreen';
import { FundingScreen } from './components/screens/FundingScreen';
import { NewsFeedsScreen } from './components/screens/NewsFeedsScreen';
import { StartupGuideScreen } from './components/screens/StartupGuideScreen';
import { DocumentsScreen } from './components/screens/DocumentsScreen';
import { AIAssistantScreen } from './components/screens/AIAssistantScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

import { MpesaPaymentModal } from './components/MpesaPaymentModal';
import { ComplianceBreakdownModal } from './components/ComplianceBreakdownModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AuthOnboardingModal } from './components/screens/AuthOnboardingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab | 'startup_guide'>('home');
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('iphone16');

  const [profiles, setProfiles] = useState<BusinessProfile[]>(DEMO_BUSINESS_PROFILES);
  const [activeProfile, setActiveProfile] = useState<BusinessProfile>(DEMO_BUSINESS_PROFILES[0]);

  const [obligations, setObligations] = useState<ObligationItem[]>(INITIAL_OBLIGATIONS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [scoreData, setScoreData] = useState(INITIAL_COMPLIANCE_SCORE);
  const [summary, setSummary] = useState(INITIAL_SUMMARY);

  // Wallet, Funding, Feeds & Startup Guide State
  const [wallet, setWallet] = useState<FounderWallet>(INITIAL_FOUNDER_WALLET);
  const [startupSteps, setStartupSteps] = useState<StartupDocumentStep[]>(STARTUP_LEGAL_ROADMAP);
  const [fundingOffers, setFundingOffers] = useState<FundingOffer[]>(INITIAL_FUNDING_OFFERS);
  const [newsFeeds, setNewsFeeds] = useState<NewsFeedItem[]>(INITIAL_NEWS_FEEDS);

  // Modals state
  const [payingObligation, setPayingObligation] = useState<ObligationItem | null>(null);
  const [viewingDocument, setViewingDocument] = useState<DocumentItem | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Unpaid count
  const pendingCount = obligations.filter((o) => !o.isPaid).length;

  // Handle M-PESA Wallet Top Up
  const handleTopUpMpesa = (amount: number, targetVaultId?: string) => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      title: targetVaultId ? 'Direct Vault Allocation via M-PESA' : 'M-PESA Direct Treasury Top-Up',
      amount,
      type: targetVaultId ? 'vault_deposit' : 'mpesa_topup',
      date: 'Just now',
      reference: `MPESA-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setWallet((prev) => {
      let updatedVaults = [...prev.vaults];
      let newAvailable = prev.availableBalance;

      if (targetVaultId) {
        updatedVaults = updatedVaults.map((v) => {
          if (v.id === targetVaultId) {
            const updatedCurrent = v.currentAmount + amount;
            return {
              ...v,
              currentAmount: updatedCurrent,
              isFunded: updatedCurrent >= v.targetAmount,
            };
          }
          return v;
        });
      } else {
        newAvailable += amount;
      }

      const totalVaultSaved = updatedVaults.reduce((sum, v) => sum + v.currentAmount, 0);

      return {
        ...prev,
        availableBalance: newAvailable,
        vaults: updatedVaults,
        totalSavedInVaults: totalVaultSaved,
        coverageRatioPercent: Math.min(100, Math.round((totalVaultSaved / prev.nextMonthLiabilitiesTotal) * 100)),
        transactions: [newTx, ...prev.transactions],
      };
    });

    // Add notification
    const topupNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'M-PESA Deposit Confirmed',
      message: `KSh ${amount.toLocaleString()} received into ComplyKE Founder Wallet. Capital protected for upcoming liabilities.`,
      date: 'Just now',
      urgency: 'green',
      agency: 'M-PESA',
      read: false,
    };
    setNotifications((prev) => [topupNotif, ...prev]);
  };

  // Handle Create Vault
  const handleCreateVault = (newVault: SavingsVault) => {
    setWallet((prev) => ({
      ...prev,
      vaults: [...prev.vaults, newVault],
    }));
  };

  const handleCreateVaultSimple = (title: string, targetAmount: number, category: 'rent' | 'statutory' | 'permits' | 'emergency') => {
    const newVault: SavingsVault = {
      id: `v-${Date.now()}`,
      title,
      category,
      targetAmount,
      currentAmount: 0,
      autoSaveFrequency: 'weekly',
      autoSaveAmount: Math.round(targetAmount / 4),
      dueDate: 'End of Month',
      isFunded: false
    };
    handleCreateVault(newVault);
  };

  // Handle Startup Step Status Update
  const handleUpdateStartupStepStatus = (
    stepId: string,
    newStatus: 'not_started' | 'in_progress' | 'acquired',
    docRef?: string
  ) => {
    setStartupSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, status: newStatus, documentRef: docRef || s.documentRef } : s))
    );
  };

  // Handle AI Guidance Request for Startup Step
  const handleAskAIAboutStep = (step: StartupDocumentStep) => {
    setActiveTab('assistant');
  };

  // Handle Complete First Time Sign-In / Onboarding
  const handleCompleteOnboarding = (
    newProfile: BusinessProfile,
    stage: 'startup' | 'existing',
    rentFee: number
  ) => {
    setActiveProfile(newProfile);
    setProfiles((prev) => [newProfile, ...prev]);

    // Update wallet rent target vault
    setWallet((prev) => {
      const updatedVaults = prev.vaults.map((v) => {
        if (v.category === 'rent' || v.category === 'coworking') {
          return {
            ...v,
            title: `${newProfile.name} Rent & Coworking Vault`,
            targetAmount: rentFee,
            autoSaveAmount: Math.round(rentFee / 4),
          };
        }
        return v;
      });
      return {
        ...prev,
        vaults: updatedVaults,
        nextMonthLiabilitiesTotal: rentFee + 53000,
      };
    });

    setIsAuthModalOpen(false);
    if (stage === 'startup') {
      setActiveTab('startup_guide');
    } else {
      setActiveTab('home');
    }
  };

  // Handle Payment Success
  const handlePaymentSuccess = (obligationId: string, receiptRef: string, paidAt: string) => {
    const targetObligation = obligations.find((o) => o.id === obligationId);
    if (!targetObligation) return;

    // 1. Mark obligation paid
    setObligations((prev) =>
      prev.map((o) =>
        o.id === obligationId
          ? { ...o, isPaid: true, status: 'compliant', receiptRef, paidAt, dueDate: 'Paid' }
          : o
      )
    );

    // 2. Add e-Receipt to Document Vault
    const newReceiptDoc: DocumentItem = {
      id: `doc-receipt-${Date.now()}`,
      title: `${targetObligation.title} Payment e-Receipt`,
      agency: targetObligation.agency,
      category: `${targetObligation.agencyCode} Receipt`,
      referenceNo: receiptRef,
      issueDate: paidAt.split(',')[0],
      amountPaid: targetObligation.amount,
      fileSize: '310 KB',
      isVerified: true,
      tags: [targetObligation.agencyCode, 'Receipt', 'Verified'],
      taxDeductible: true,
      downloadUrl: '#',
    };

    setDocuments((prev) => [newReceiptDoc, ...prev]);

    // 3. Add notification item
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `${targetObligation.agencyCode} Paid Successfully`,
      message: `KSh ${targetObligation.amount.toLocaleString()} processed for ${targetObligation.title}. Official e-Receipt ${receiptRef} generated.`,
      date: 'Just now',
      urgency: 'green',
      agency: targetObligation.agencyCode,
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // 4. Recalculate compliance score
    setScoreData((prev) => {
      const newScore = Math.min(100, prev.overallScore + 3);
      return {
        ...prev,
        overallScore: newScore,
        statusText: newScore >= 95 ? "You're Fully Compliant" : "You're Compliant",
      };
    });

    // 5. Update summary amounts
    setSummary((prev) => ({
      ...prev,
      totalLegalCosts: prev.totalLegalCosts + targetObligation.amount,
      dueThisMonth: Math.max(0, prev.dueThisMonth - targetObligation.amount),
    }));

    setPayingObligation(null);
  };

  const handleViewReceiptByRef = (receiptRef: string) => {
    const matchedDoc = documents.find((d) => d.referenceNo === receiptRef) || {
      id: 'doc-fallback',
      title: 'KRA / SHA Official Payment Receipt',
      agency: 'Government Portal',
      category: 'Receipt',
      referenceNo: receiptRef,
      issueDate: 'Today',
      amountPaid: 18450,
      fileSize: '280 KB',
      isVerified: true,
      tags: ['Official', 'Receipt'],
      taxDeductible: true,
      downloadUrl: '#',
    };
    setViewingDocument(matchedDoc);
  };

  const handleResetDemoState = () => {
    setObligations(INITIAL_OBLIGATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setScoreData(INITIAL_COMPLIANCE_SCORE);
    setSummary(INITIAL_SUMMARY);
    setWallet(INITIAL_FOUNDER_WALLET);
    setStartupSteps(STARTUP_LEGAL_ROADMAP);
    setFundingOffers(INITIAL_FUNDING_OFFERS);
    setNewsFeeds(INITIAL_NEWS_FEEDS);
    setActiveTab('home');
    alert('ComplyKE demo state has been reset successfully!');
  };

  const renderActiveTabScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            profile={activeProfile}
            scoreData={scoreData}
            obligations={obligations}
            summary={summary}
            wallet={wallet}
            newsItems={newsFeeds}
            onOpenScoreBreakdown={() => setIsScoreModalOpen(true)}
            onPayObligation={(obl) => setPayingObligation(obl)}
            onViewReceipt={handleViewReceiptByRef}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenOnboarding={() => setIsAuthModalOpen(true)}
          />
        );
      case 'payments':
        return (
          <PaymentsScreen
            obligations={obligations}
            wallet={wallet}
            profile={activeProfile}
            scoreData={scoreData}
            fundingOffers={fundingOffers}
            onPayObligation={(obl) => setPayingObligation(obl)}
            onViewReceipt={handleViewReceiptByRef}
            onTopUpMpesa={() => handleTopUpMpesa(10000)}
            onCreateVault={handleCreateVaultSimple}
            onNavigateToDocuments={() => setActiveTab('documents')}
          />
        );
      case 'startup_guide':
        return (
          <StartupGuideScreen
            profile={activeProfile}
            steps={startupSteps}
            onUpdateStepStatus={handleUpdateStartupStepStatus}
            onAskAIAboutStep={handleAskAIAboutStep}
          />
        );
      case 'documents':
        return (
          <DocumentsScreen
            documents={documents}
            onViewDocument={(doc) => setViewingDocument(doc)}
            onAddDocument={(newDoc) => setDocuments((prev) => [newDoc, ...prev])}
          />
        );
      case 'assistant':
        return (
          <AIAssistantScreen
            profile={activeProfile}
            obligations={obligations}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            profile={activeProfile}
            profiles={profiles}
            wallet={wallet}
            onSelectProfile={(p) => setActiveProfile(p)}
            onResetData={handleResetDemoState}
            onTopUpMpesa={() => handleTopUpMpesa(10000)}
            onCreateVault={handleCreateVaultSimple}
          />
        );
      default:
        return (
          <HomeScreen
            profile={activeProfile}
            scoreData={scoreData}
            obligations={obligations}
            summary={summary}
            wallet={wallet}
            onOpenScoreBreakdown={() => setIsScoreModalOpen(true)}
            onPayObligation={(obl) => setPayingObligation(obl)}
            onViewReceipt={handleViewReceiptByRef}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenOnboarding={() => setIsAuthModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col antialiased">
      {/* App Header */}
      <Header
        activeProfile={activeProfile}
        profiles={profiles}
        onSelectProfile={(p) => setActiveProfile(p)}
        deviceFrame={deviceFrame}
        setDeviceFrame={setDeviceFrame}
        notifications={notifications}
        onToggleNotifications={() => setIsNotificationOpen(!isNotificationOpen)}
        isNotificationOpen={isNotificationOpen}
        score={scoreData.overallScore}
      />

      {/* Main View Port Container */}
      <main className="flex-1 flex flex-col justify-center py-2 sm:py-6 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
        <MobileFrame frameType={deviceFrame}>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto">
              {renderActiveTabScreen()}
            </div>

            {/* Bottom Navigation Bar */}
            <BottomNav
              activeTab={activeTab === 'startup_guide' ? 'home' : activeTab}
              setActiveTab={(tab) => setActiveTab(tab)}
              pendingActionCount={pendingCount}
            />
          </div>
        </MobileFrame>
      </main>

      {/* Interactive Modals */}
      {payingObligation && (
        <MpesaPaymentModal
          obligation={payingObligation}
          onClose={() => setPayingObligation(null)}
          onSuccess={handlePaymentSuccess}
          defaultPhone={activeProfile.mpesaPhone}
        />
      )}

      {isScoreModalOpen && (
        <ComplianceBreakdownModal
          scoreData={scoreData}
          onClose={() => setIsScoreModalOpen(false)}
          onOpenAI={() => {
            setIsScoreModalOpen(false);
            setActiveTab('assistant');
          }}
        />
      )}

      {viewingDocument && (
        <DocumentViewerModal
          document={viewingDocument}
          onClose={() => setViewingDocument(null)}
        />
      )}

      <AuthOnboardingModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onCompleteOnboarding={handleCompleteOnboarding}
      />

      <NotificationsDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
      />
    </div>
  );
}
