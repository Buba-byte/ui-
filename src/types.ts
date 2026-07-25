export type InsuranceType = 'renters' | 'homeowners' | 'pet' | 'car' | 'life';

export type ViewMode = 'interactive' | 'blueprint' | 'design-system';

export type DeviceFrame = 'iphone16' | 'android' | 'borderless';

export interface ValuableItem {
  id: string;
  category: 'Jewelry' | 'Electronics' | 'Bicycles' | 'Cameras' | 'Fine Art' | 'Musical Instruments';
  name: string;
  estimatedValue: number;
  description?: string;
}

export interface CharityCause {
  id: string;
  name: string;
  category: string;
  description: string;
  logoIcon: string;
  impactStatement: string;
  badgeColor: string;
}

export interface CoverageState {
  productType: InsuranceType;
  // Personal details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Property details
  address: string;
  city: string;
  state: string;
  zipCode: string;
  buildingType: 'apartment' | 'condo' | 'single_family' | 'townhouse' | 'multi_family';
  floorLevel?: string;
  isRenting: boolean;
  
  // Household details
  roommatesCount: number;
  hasPartner: boolean;
  hasPets: boolean;
  petTypes: ('dog' | 'cat' | 'other')[];
  petNames: string;

  // Security features
  hasSmokeAlarm: boolean;
  hasBurglarAlarm: boolean;
  hasWaterLeakSensor: boolean;
  hasDeadbolts: boolean;
  hasSprinklers: boolean;
  hasGatedEntry: boolean;

  // Valuables
  valuableItems: ValuableItem[];

  // Coverage limits
  personalPropertyLimit: number; // e.g. 20000
  personalLiabilityLimit: number; // e.g. 100000
  lossOfUseLimit: number; // e.g. 4000
  medicalPaymentsLimit: number; // e.g. 1000
  deductible: number; // 250, 500, 1000, 2500

  // Selected Giveback Charity
  selectedCharityId: string;

  // Calculated values
  monthlyPrice: number;
  discountPercentage: number;
}

export interface MayaChatMessage {
  id: string;
  sender: 'maya' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export interface ScreenSpec {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  keyComponents: string[];
  designNotes: string;
}
