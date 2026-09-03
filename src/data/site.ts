export const SITE = {
  name: 'Dingwei Battery',
  url: 'https://dingweibattery.com',
  tagline: 'OEM & private-label automotive battery programs',
};

export const BRAND = 'Dingwei Battery';

export const MANUFACTURER = {
  name: 'Chengguang Energy',
  legalName: 'Jinzhou Chengguang Power Source Co., Ltd.',
  shortName: 'Chengguang Power Tech',
  founded: 2002,
  address: 'Jinzhou, Hebei, China',
  factoryArea: '200,000 m²',
  productionLines: '18 lines',
  dailyOutput: '40,000+ batteries per day',
  employees: '500+',
  registeredCapital: 'RMB 50 million',
  exportMarkets: '70+ countries',
  exportPorts: 'Tianjin / Shanghai',
};

export const RELATIONSHIP =
  'Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Energy (founded 2002).';

export const CERTIFICATIONS = ['IATF 16949', 'ISO 9001', 'ISO 45001', 'OHSAS 18001', 'CE'];

export const STANDARDS = ['JIS', 'DIN', 'BCI', 'AS', 'SA'];

export const OEM_PROCESS = [
  { step: '1', title: 'Consultation', description: 'Requirements, vehicle fitment and target market review.' },
  { step: '2', title: 'Specification', description: 'Voltage, capacity, CCA, standard and terminal definition.' },
  { step: '3', title: 'Design & branding', description: 'Label, case, packaging and private-label artwork.' },
  { step: '4', title: 'Sampling', description: 'Pre-production samples for approval.' },
  { step: '5', title: 'Mass production', description: 'Scheduled manufacturing and in-process control.' },
  { step: '6', title: 'Quality control', description: 'Inspection and conformance to agreed specifications.' },
  { step: '7', title: 'Shipping & logistics', description: 'Export packaging and shipment from Tianjin / Shanghai.' },
];

export const TRADE_TERMS = {
  moq: '1 × 20ft container (approx. 600–800 units, model dependent)',
  leadTime: '30–45 days after order confirmation',
  payment: 'T/T (30% deposit, 70% before shipment) or L/C at sight',
  incoterms: 'FOB Tianjin / CFR / CIF',
  warranty: '12 months from bill of lading date',
};

export const PUBLISHED_DATE = '2026-09-01';

export interface BatteryModel {
  model: string;
  aliases?: string[];
  standard: string;
  standard_code: string;
  voltage: number;
  capacity_ah: number;
  c20_ah: number;
  cca: { value: number; basis: string; confidence: string; note: string };
  rc_min: number | null;
  dimensions_mm: { length: number; width: number; height: number };
  case_size: string;
  terminal: string | null;
  polarity: string | null;
  technology: string;
  application: string;
  vehicle_type: string | null;
  weight_kg: number;
  oem_available: boolean;
  private_label_available: boolean;
  source: string;
  verified_date: string;
  confidence: string;
  image?: string;
}

export interface BatteryType {
  id: string;
  name: string;
  description: string;
  standards: string;
  href: string;
}

export const BATTERY_TYPES: BatteryType[] = [
  {
    id: 'sli',
    name: 'SLI',
    description: 'Conventional flooded starting, lighting and ignition batteries for standard passenger and light-commercial vehicles.',
    standards: 'JIS / DIN / BCI / AS / SA',
    href: '/oem/car-batteries/',
  },
  {
    id: 'agm',
    name: 'AGM',
    description: 'Absorbent glass mat batteries for start-stop systems and vehicles with higher electrical demand.',
    standards: 'DIN / BCI / EN',
    href: '/oem/car-batteries/',
  },
  {
    id: 'efb',
    name: 'EFB',
    description: 'Enhanced flooded batteries offering higher cycling durability than conventional SLI.',
    standards: 'DIN / BCI / EN',
    href: '/oem/car-batteries/',
  },
  {
    id: 'heavy-duty',
    name: 'Heavy Duty',
    description: 'Truck, bus and construction-equipment batteries in 6V and 12V configurations.',
    standards: 'JIS / DIN / BCI / SA',
    href: '/heavy-duty-batteries/',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'OEM', href: '/oem/' },
  { label: 'Private Label', href: '/private-label/' },
  { label: 'Heavy Duty', href: '/heavy-duty-batteries/' },
  { label: 'Factory', href: '/factory/' },
  { label: 'Knowledge', href: '/knowledge/what-is-oem-battery/' },
  { label: 'Contact', href: '/contact/' },
];
