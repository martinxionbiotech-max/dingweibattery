import type { Locale } from '../i18n/ui';

export const SITE = {
  name: 'Dingwei Battery',
  url: 'https://dingweibattery.com',
  tagline: 'OEM & private-label automotive battery programs',
};

export const BRAND = 'Dingwei Battery';

export const MANUFACTURER = {
  name: 'Chengguang Power Tech Co., Ltd.',
  legalName: 'Chengguang Power Tech Co., Ltd.',
  legalNameZh: '晋州成光电源有限公司',
  shortName: 'Chengguang Power Tech',
  founded: 2002,
  address: 'Maju Industrial Park, Jinzhou, Hebei, China',
  factoryArea: '200,000 m²',
  productionLines: '18 automated lines',
  dailyOutput: '40,000 batteries per day',
  annualCapacity: '10,000,000 KVAh',
  exportMarkets: '70+ countries',
  exportPorts: 'Tianjin / Shanghai',
};

export const RELATIONSHIP =
  'Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).';

export const CONTACT = {
  email: 'martin@dinweys.com',
  phone: '+86 13323237275',
  phoneLink: 'tel:+8613323237275',
  whatsapp: '+86 13323237275',
  whatsappLink: 'https://wa.me/8613323237275',
};

export const CERTIFICATIONS = ['IATF 16949', 'ISO 9001', 'ISO 45001', 'OHSAS 18001'];

export const STANDARDS = ['JIS', 'DIN', 'BCI', 'AS', 'SA'];

export interface OemStep {
  step: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const OEM_PROCESS: OemStep[] = [
  {
    step: '1',
    title: { en: 'Consultation', es: 'Consulta', ar: 'الاستشارة', ru: 'Консультация' },
    description: {
      en: 'Requirements, vehicle fitment and target market review.',
      es: 'Revisión de requisitos, compatibilidad del vehículo y mercado objetivo.',
      ar: 'مراجعة المتطلبات وتوافق المركبة والسوق المستهدف.',
      ru: 'Анализ требований, совместимости с автомобилем и целевого рынка.',
    },
  },
  {
    step: '2',
    title: { en: 'Specification', es: 'Especificación', ar: 'المواصفات', ru: 'Спецификация' },
    description: {
      en: 'Voltage, capacity, CCA, standard and terminal definition.',
      es: 'Definición de voltaje, capacidad, CCA, estándar y terminales.',
      ar: 'تحديد الجهد والسعة وCCA والمعيار والأطراف.',
      ru: 'Определение напряжения, ёмкости, CCA, стандарта и клемм.',
    },
  },
  {
    step: '3',
    title: { en: 'Design & branding', es: 'Diseño y marca', ar: 'التصميم والعلامة التجارية', ru: 'Дизайн и брендинг' },
    description: {
      en: 'Label, case, packaging and private-label artwork.',
      es: 'Etiqueta, carcasa, embalaje y arte de marca privada.',
      ar: 'الملصق والهيكل والتغليف وتصميم العلامة الخاصة.',
      ru: 'Этикетка, корпус, упаковка и дизайн частной марки.',
    },
  },
  {
    step: '4',
    title: { en: 'Sampling', es: 'Muestreo', ar: 'العينات', ru: 'Образцы' },
    description: {
      en: 'Pre-production samples for approval.',
      es: 'Muestras de preproducción para aprobación.',
      ar: 'عينات ما قبل الإنتاج للموافقة.',
      ru: 'Предсерийные образцы для утверждения.',
    },
  },
  {
    step: '5',
    title: { en: 'Mass production', es: 'Producción en serie', ar: 'الإنتاج الضخم', ru: 'Серийное производство' },
    description: {
      en: 'Scheduled manufacturing and in-process control.',
      es: 'Fabricación programada y control en proceso.',
      ar: 'تصنيع مجدول ومراقبة أثناء العملية.',
      ru: 'Плановое производство и контроль в процессе.',
    },
  },
  {
    step: '6',
    title: { en: 'Quality control', es: 'Control de calidad', ar: 'مراقبة الجودة', ru: 'Контроль качества' },
    description: {
      en: 'Inspection and conformance to agreed specifications.',
      es: 'Inspección y conformidad con las especificaciones acordadas.',
      ar: 'الفحص والمطابقة للمواصفات المتفق عليها.',
      ru: 'Проверка и соответствие согласованным спецификациям.',
    },
  },
  {
    step: '7',
    title: { en: 'Shipping & logistics', es: 'Envío y logística', ar: 'الشحن والخدمات اللوجستية', ru: 'Доставка и логистика' },
    description: {
      en: 'Export packaging and shipment from Tianjin / Shanghai.',
      es: 'Embalaje de exportación y envío desde Tianjin / Shanghái.',
      ar: 'تغليف التصدير والشحن من تيانجين / شنغهاي.',
      ru: 'Экспортная упаковка и отгрузка из Тяньцзиня / Шанхая.',
    },
  },
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
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  standards: string;
  href: string;
}

export const BATTERY_TYPES: BatteryType[] = [
  {
    id: 'sli',
    name: { en: 'SLI', es: 'SLI', ar: 'SLI', ru: 'SLI' },
    description: {
      en: 'Conventional flooded starting, lighting and ignition batteries for standard passenger and light-commercial vehicles.',
      es: 'Baterías convencionales inundadas de arranque, iluminación y encendido para turismos y vehículos comerciales ligeros estándar.',
      ar: 'بطاريات تقليدية مغمورة للتشغيل والإضاءة والإشعال للسيارات العادية والمركبات التجارية الخفيفة.',
      ru: 'Обычные залитые стартерные аккумуляторы (запуск, освещение и зажигание) для стандартных легковых и лёгких коммерческих автомобилей.',
    },
    standards: 'JIS / DIN / BCI / AS / SA',
    href: '/oem/car-batteries/',
  },
  {
    id: 'agm',
    name: { en: 'AGM', es: 'AGM', ar: 'AGM', ru: 'AGM' },
    description: {
      en: 'Absorbent glass mat batteries for start-stop systems and vehicles with higher electrical demand.',
      es: 'Baterías de malla de fibra de vidrio absorbente (AGM) para sistemas start-stop y vehículos con mayor demanda eléctrica.',
      ar: 'بطاريات بساط زجاجي ماص (AGM) لأنظمة التشغيل/الإيقاف والمركبات ذات الطلب الكهربائي الأعلى.',
      ru: 'Аккумуляторы AGM (с абсорбированным стекловолокном) для систем start-stop и автомобилей с повышенной электрической нагрузкой.',
    },
    standards: 'DIN / BCI / EN',
    href: '/oem/car-batteries/',
  },
  {
    id: 'efb',
    name: { en: 'EFB', es: 'EFB', ar: 'EFB', ru: 'EFB' },
    description: {
      en: 'Enhanced flooded batteries offering higher cycling durability than conventional SLI.',
      es: 'Baterías inundadas mejoradas que ofrecen mayor durabilidad de ciclado que las SLI convencionales.',
      ar: 'بطاريات مغمورة محسّنة توفر متانة تدوير أعلى من SLI التقليدية.',
      ru: 'Улучшенные залитые аккумуляторы (EFB) с более высокой циклической стойкостью, чем обычные SLI.',
    },
    standards: 'DIN / BCI / EN',
    href: '/oem/car-batteries/',
  },
  {
    id: 'heavy-duty',
    name: { en: 'Heavy Duty', es: 'Servicio Pesado', ar: 'الخدمة الشاقة', ru: 'Тяжёлый режим' },
    description: {
      en: 'Truck, bus and construction-equipment batteries in 6V and 12V configurations.',
      es: 'Baterías para camiones, autobuses y equipos de construcción en configuraciones de 6V y 12V.',
      ar: 'بطاريات للشاحنات والحافلات ومعدات البناء بتكوينات 6 فولت و12 فولت.',
      ru: 'Аккумуляторы для грузовиков, автобусов и строительной техники в конфигурациях 6В и 12В.',
    },
    standards: 'JIS / DIN / BCI / SA',
    href: '/heavy-duty-batteries/',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'OEM', href: '/oem/' },
  { label: 'Private Label', href: '/private-label/' },
  { label: 'Heavy Duty', href: '/heavy-duty-batteries/' },
  { label: 'Models', href: '/data/' },
  { label: 'Factory', href: '/factory/' },
  { label: 'Knowledge', href: '/knowledge/what-is-oem-battery/' },
  { label: 'Contact', href: '/contact/' },
];
