import { CharityCause, CoverageState, InsuranceType, ScreenSpec } from '../types';

export const INITIAL_COVERAGE_STATE: CoverageState = {
  productType: 'renters',
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  phone: '(555) 234-5678',
  dateOfBirth: '1995-06-15',
  address: '450 West 33rd Street, New York, NY 10001',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  buildingType: 'apartment',
  floorLevel: '4th Floor',
  isRenting: true,
  roommatesCount: 1,
  hasPartner: false,
  hasPets: true,
  petTypes: ['dog'],
  petNames: 'Milo',
  hasSmokeAlarm: true,
  hasBurglarAlarm: true,
  hasWaterLeakSensor: false,
  hasDeadbolts: true,
  hasSprinklers: true,
  hasGatedEntry: false,
  valuableItems: [
    {
      id: 'val-1',
      category: 'Electronics',
      name: 'MacBook Pro 16"',
      estimatedValue: 2400,
      description: 'M3 Max 32GB RAM Space Black'
    },
    {
      id: 'val-2',
      category: 'Jewelry',
      name: 'Diamond Engagement Ring',
      estimatedValue: 3500,
      description: 'Custom platinum setting'
    }
  ],
  personalPropertyLimit: 30000,
  personalLiabilityLimit: 100000,
  lossOfUseLimit: 6000,
  medicalPaymentsLimit: 1000,
  deductible: 500,
  selectedCharityId: 'charity-unicef',
  monthlyPrice: 12.50,
  discountPercentage: 15
};

export const INSURANCE_PRODUCTS: {
  id: InsuranceType;
  title: string;
  tagline: string;
  startingPrice: string;
  iconName: string;
  popular?: boolean;
  color: string;
}[] = [
  {
    id: 'renters',
    title: 'Renters Insurance',
    tagline: 'Protects your stuff & liability in your rented home or apartment',
    startingPrice: '$5/mo',
    iconName: 'Home',
    popular: true,
    color: '#FF0083'
  },
  {
    id: 'homeowners',
    title: 'Homeowners',
    tagline: 'Full structural & personal property protection for home owners',
    startingPrice: '$25/mo',
    iconName: 'Building2',
    color: '#2563EB'
  },
  {
    id: 'pet',
    title: 'Pet Insurance',
    tagline: 'Covers vet bills, accidents, illnesses, and preventive care',
    startingPrice: '$10/mo',
    iconName: 'Dog',
    popular: true,
    color: '#059669'
  },
  {
    id: 'car',
    title: 'Car Insurance',
    tagline: 'Great coverage, fast claims, and tree planting per driven mile',
    startingPrice: '$30/mo',
    iconName: 'Car',
    color: '#7C3AED'
  },
  {
    id: 'life',
    title: 'Term Life Insurance',
    tagline: 'Financial peace of mind for your loved ones with no medical exam',
    startingPrice: '$9/mo',
    iconName: 'HeartHandshake',
    color: '#DB2777'
  }
];

export const GIVEBACK_CHARITIES: CharityCause[] = [
  {
    id: 'charity-unicef',
    name: 'UNICEF',
    category: 'Children & Global Health',
    description: 'Providing lifesaving aid, vaccines, and clean water to vulnerable children across 190+ countries.',
    logoIcon: 'Globe',
    impactStatement: 'Helped deliver 24,000+ polio vaccines through Lemonade Giveback.',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  {
    id: 'charity-water',
    name: 'charity: water',
    category: 'Clean Water',
    description: 'Bringing clean and safe drinking water to communities in developing nations.',
    logoIcon: 'Droplets',
    impactStatement: 'Funded 18 complete community water wells serving 4,500 people.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'charity-aclu',
    name: 'ACLU',
    category: 'Civil Rights & Justice',
    description: 'Defending the individual rights and liberties guaranteed by the Constitution and laws of the US.',
    logoIcon: 'ShieldCheck',
    impactStatement: 'Supported landmark legal defense campaigns for equal rights.',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'charity-trevor',
    name: 'The Trevor Project',
    category: 'LGBTQ+ Youth Crisis',
    description: 'The world’s largest suicide prevention and crisis intervention organization for LGBTQ young people.',
    logoIcon: 'Heart',
    impactStatement: 'Powered 24/7 crisis support counseling for over 12,000 youth.',
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  {
    id: 'charity-wck',
    name: 'World Central Kitchen',
    category: 'Disaster Food Relief',
    description: 'Providing fresh, nourishing meals in response to humanitarian, climate, and community crises.',
    logoIcon: 'Utensils',
    impactStatement: 'Served over 85,000 warm meals in disaster-stricken regions.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'charity-humane',
    name: 'Humane Society',
    category: 'Animal Protection',
    description: 'Fighting for all animals through advocacy, rescue, and shelter support nationwide.',
    logoIcon: 'PawPrint',
    impactStatement: 'Provided medical rescue & shelter for 3,200 animals in need.',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200'
  }
];

export const SCREEN_FLOW_SPECS: ScreenSpec[] = [
  {
    id: 1,
    title: 'Welcome & Product Selector',
    subtitle: 'Hero Framing & Product Pick',
    category: 'Entry Framing',
    description: 'High-energy Lemonade Magenta brand header introducing AI Maya, quick tagline, and 1-tap product cards with starting prices.',
    keyComponents: ['Brand Header with AI Maya Avatar', 'Product Selection Cards', 'Trust Badges (B-Corp, Instant Payouts)', 'Sticky Bottom Action CTA'],
    designNotes: 'Uses Lemonade pink (#FF0083) accenting, generous 24px corner radii, and 1-tap pill selections.'
  },
  {
    id: 2,
    title: 'Personal Info Framing',
    subtitle: 'Conversational Data Capture',
    category: 'Identity',
    description: 'AI Maya asks for your name and contact details in a conversational bubble format to calculate personalized location rates.',
    keyComponents: ['AI Maya Chat Bubble', 'Floating Label Text Inputs', 'Instant Validation States', 'Progress Tracker'],
    designNotes: 'Focuses on single-column accessibility with auto-focus floating inputs and friendly copy tone.'
  },
  {
    id: 3,
    title: 'Address & Pinpoint Map',
    subtitle: 'Property Address & Building Type',
    category: 'Location',
    description: 'Address autocomplete search with interactive location map pin, unit floor level selector, and property type buttons.',
    keyComponents: ['Location Search Bar', 'Interactive Pinpoint Map Canvas', 'Building Type Pill Grid (Apartment, House, Condo)', 'Floor Selector Slider'],
    designNotes: 'Integrated interactive leaflet/pin style visualizer to give users spatial confidence in property boundaries.'
  },
  {
    id: 4,
    title: 'Living Situation & Household',
    subtitle: 'Occupancy & Pets',
    category: 'Risk Factors',
    description: 'Rent vs Own confirmation, roommate counter, and pet profile setup for comprehensive liability assessment.',
    keyComponents: ['Rent vs Own Toggle Switch', 'Interactive Numeric Steppers', 'Pet Type Icons (Dogs, Cats)', 'Partner Status Chips'],
    designNotes: 'Soft animated numeric controls and friendly pet illustrations with micro-feedback.'
  },
  {
    id: 5,
    title: 'Safety & Discount Framing',
    subtitle: 'Protective Systems Check',
    category: 'Discounts',
    description: 'Interactive checklist of installed safety equipment to unlock real-time rate discounts up to 20%.',
    keyComponents: ['Discount Badges (-5%, -10%)', 'Equipment Checkboxes (Smoke, Alarm, Water Sensors)', 'Live Savings Counter'],
    designNotes: 'Encouraging discount counter updates dynamically in real-time as checkboxes are clicked.'
  },
  {
    id: 6,
    title: 'High-Value Items & Add-ons',
    subtitle: 'Extra Coverage Declaration',
    category: 'Property Limits',
    description: 'Declare high-value items like laptops, rings, camera gear, and electric bikes for zero-deductible scheduled coverage.',
    keyComponents: ['Item Addition Modal', 'Scheduled Property List', 'Category Chips (Jewelry, Tech, Art)', 'Deductible Waiver Toggle'],
    designNotes: 'Structured cards with estimated values and zero-deductible badges.'
  },
  {
    id: 7,
    title: 'Coverage Calculator & Sliders',
    subtitle: 'Custom Policy Limits',
    category: 'Pricing Engine',
    description: 'Interactive slider engine for Personal Property, Liability, Deductible, and Loss of Use with live price feedback.',
    keyComponents: ['Live Monthly Price Header', 'Interactive Range Sliders', 'Deductible Selector Pills ($250-$2,500)', 'Coverage Tooltips'],
    designNotes: 'Features prominent sticky price gauge bar that recalculates immediately upon tweaking any slider.'
  },
  {
    id: 8,
    title: 'Lemonade Giveback Selection',
    subtitle: 'Charity Cause Selection',
    category: 'Social Impact',
    description: 'Select a non-profit organization to receive leftover underwriting profit as part of Lemonade’s B-Corp Giveback model.',
    keyComponents: ['Giveback Mission Header', 'Charity Cards with Impact Stats', 'Category Filters', 'Selection Badge'],
    designNotes: 'Showcases Lemonade’s signature social impact feature with authentic cause cards.'
  },
  {
    id: 9,
    title: 'AI Risk Calculation & Instant Policy',
    subtitle: 'Quote Breakdown & Checkout',
    category: 'Final Checkout',
    description: 'AI Maya risk summary animation, itemized monthly breakdown, digital sign-on-screen canvas, and policy activation confetti!',
    keyComponents: ['AI Maya Analysis Spinner', 'Itemized Premium Breakdown', 'Digital Signature Pad', 'Instant Activation Button', 'Confetti Celebration'],
    designNotes: 'Provides transparent price breakdown (Base + Add-ons - Discounts) and seamless 1-tap activation.'
  }
];
