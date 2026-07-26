export type NavTab = 'home' | 'payments' | 'documents' | 'assistant' | 'profile' | 'startup_guide';

export type DeviceFrame = 'iphone16' | 'android' | 'fullscreen';

export type BusinessStage = 'startup' | 'existing';

export interface FundingOffer {
  id: string;
  title: string;
  provider: string;
  providerLogoText: string;
  category: 'Government Grant' | 'SME Bank Credit' | 'Microfinance' | 'Fintech Line';
  minAmount: number;
  maxAmount: number;
  interestRate: string;
  tenureMonths: string;
  eligibilityScoreRequired: number; // 0 to 100
  isPreApproved: boolean;
  requiredDocuments: string[];
  description: string;
  applicationUrl?: string;
  fundingPurpose: string;
}

export interface NewsFeedItem {
  id: string;
  title: string;
  category: 'Tax Changes' | 'CBK & Finance' | 'SME Vlog' | 'County Permits' | 'SHA & Labour';
  source: string;
  authorTitle: string;
  authorAvatar: string;
  publishedTime: string;
  readTime: string;
  hasVideo: boolean;
  videoDuration?: string;
  thumbnailUrl: string;
  summaryText: string;
  keyTakeaways: string[];
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  officialSourceUrl?: string;
}

export type ObligationStatus = 'compliant' | 'action_required' | 'urgent' | 'pending_verification';

export type ObligationCategory = 
  | 'KRA Tax' 
  | 'SHA Healthcare' 
  | 'NSSF Pension' 
  | 'County Permit' 
  | 'Licences & Regulatory' 
  | 'Data Protection' 
  | 'Standards & Safety';

export interface ObligationItem {
  id: string;
  title: string;
  agency: string;
  agencyCode: 'KRA' | 'SHA' | 'NSSF' | 'COUNTY' | 'BRS' | 'KEBS' | 'ODPC' | 'EPRA' | 'NEMA';
  dueDate: string; // e.g. "Tomorrow", "In 5 days", "15th Aug 2026"
  daysRemaining: number;
  amount: number; // in KSh
  status: ObligationStatus;
  category: ObligationCategory;
  description: string;
  isPaid: boolean;
  paidAt?: string;
  receiptRef?: string;
  penaltyAvoided?: number;
  taxOptimizationTip?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  agency: string;
  category: string;
  referenceNo: string;
  issueDate: string;
  expiryDate?: string;
  amountPaid?: number;
  fileSize: string;
  isVerified: boolean;
  tags: string[];
  taxDeductible: boolean;
  downloadUrl?: string;
}

export interface ConnectedService {
  id: string;
  name: string;
  portalName: string;
  agencyCode: string;
  status: 'connected' | 'action_required' | 'disconnected';
  lastSync: string;
  identifier: string; // e.g. "PIN: A019283746Z"
}

export interface BusinessProfile {
  id: string;
  name: string;
  registrationNo: string;
  kraPin: string;
  nationalId: string;
  ownerName: string;
  industry: string;
  businessType: 'SME' | 'Private Limited (Ltd)' | 'Sole Proprietorship' | 'Partnership';
  stage: BusinessStage;
  county: string;
  employeesCount: number;
  monthlyTurnoverEstimate: number;
  connectedServices: ConnectedService[];
  mpesaPhone: string;
  securityPINSet: boolean;
  biometricsEnabled: boolean;
  rentOrCoworkingMonthly: number;
}

export interface StartupDocumentStep {
  id: string;
  title: string;
  agency: string;
  agencyCode: string;
  estimatedFee: number;
  isRequired: boolean;
  status: 'not_started' | 'in_progress' | 'acquired';
  description: string;
  portalUrl: string;
  aiGuidanceTip: string;
  documentRef?: string;
}

export interface SavingsVault {
  id: string;
  title: string;
  category: 'rent' | 'coworking' | 'statutory' | 'permits' | 'emergency';
  targetAmount: number;
  currentAmount: number;
  autoSaveFrequency: 'weekly' | 'monthly' | 'disabled';
  autoSaveAmount: number;
  dueDate: string;
  isFunded: boolean;
}

export interface WalletTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'mpesa_topup' | 'vault_deposit' | 'compliance_payout';
  date: string;
  reference: string;
  vaultName?: string;
}

export interface FounderWallet {
  availableBalance: number;
  totalSavedInVaults: number;
  nextMonthLiabilitiesTotal: number;
  coverageRatioPercent: number;
  vaults: SavingsVault[];
  transactions: WalletTransaction[];
}

export interface ComplianceScoreBreakdown {
  overallScore: number;
  statusText: string;
  statusColor: 'green' | 'orange' | 'red';
  taxes: { score: number; status: 'green' | 'orange' | 'red'; count: number; note: string };
  licenses: { score: number; status: 'green' | 'orange' | 'red'; count: number; note: string };
  payroll: { score: number; status: 'green' | 'orange' | 'red'; count: number; note: string };
  permits: { score: number; status: 'green' | 'orange' | 'red'; count: number; note: string };
  filings: { score: number; status: 'green' | 'orange' | 'red'; count: number; note: string };
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  keyObligations?: string[];
  savingsTip?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  urgency: 'green' | 'orange' | 'red';
  agency: string;
  read: boolean;
  actionUrl?: string;
}

export interface MonthlyFinancialSummary {
  totalLegalCosts: number;
  potentialSavings: number;
  penaltiesAvoided: number;
  dueThisMonth: number;
}
