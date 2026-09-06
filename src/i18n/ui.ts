// UI strings for header/footer/common chrome and shared components, per locale.
// Body copy for pages is translated inline in each locale page directory.

export const LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ru', label: 'Русский', dir: 'ltr' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

export const localeDir = (locale: Locale): 'ltr' | 'rtl' =>
  LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';

export const isDefaultLocale = (locale: string): boolean => locale === DEFAULT_LOCALE;

interface NavStrings {
  home: string;
  oem: string;
  privateLabel: string;
  heavyDuty: string;
  models: string;
  factory: string;
  knowledge: string;
  contact: string;
}

interface FooterStrings {
  programs: string;
  oemBatteries: string;
  carBatteries: string;
  truckBatteries: string;
  privateLabel: string;
  heavyDutyBatteries: string;
  resources: string;
  whatIsOem: string;
  oemVsOdm: string;
  choosingManufacturer: string;
  supplierChecklist: string;
  specGuide: string;
  batteryFinder: string;
  contact: string;
  requestQuote: string;
  manufacturer: string;
  factoryOverview: string;
}

interface StatsbarStrings {
  factoryArea: string;
  productionLines: string;
  exportCountries: string;
  qualitySystem: string;
}

interface CtaStrings {
  defaultTitle: string;
  defaultText: string;
}

interface UiStrings {
  skipToContent: string;
  requestOemQuote: string;
  whatsapp: string;
  email: string;
  relationship: string;
  founded: string; // {year} placeholder
  exportPorts: string;
  certsLine: string; // {name} {certs} placeholders
  legalLine: string; // {year} {brand} {legalName} placeholders
  explore: string; // "Explore {name}"
  oemProcessTitle: string;
  oemProcessLead: string;
  batteryLabel: string; // "{model} Battery" suffix
  viewSpec: string;
  breadcrumb: string; // aria-label
  nav: NavStrings;
  footer: FooterStrings;
  statsbar: StatsbarStrings;
  cta: CtaStrings;
}

export const UI: Record<Locale, UiStrings> = {
  en: {
    skipToContent: 'Skip to content',
    requestOemQuote: 'Request OEM Quote',
    whatsapp: 'WhatsApp',
    email: 'Email',
    relationship:
      'Dingwei Battery provides OEM and private-label battery programs manufactured by Chengguang Power Tech Co., Ltd. (founded 2002).',
    founded: 'Founded {year}',
    exportPorts: 'Export ports',
    certsLine: 'Certifications referenced on this site are held by {name}: {certs}.',
    legalLine:
      '© {year} {brand}. {legalName}. All specifications are for reference; confirm final values with the manufacturer before ordering.',
    explore: 'Explore {name}',
    oemProcessTitle: 'OEM process',
    oemProcessLead: 'Seven steps from first consultation to shipment.',
    batteryLabel: 'Battery',
    viewSpec: 'View specification',
    breadcrumb: 'Breadcrumb',
    nav: {
      home: 'Home',
      oem: 'OEM',
      privateLabel: 'Private Label',
      heavyDuty: 'Heavy Duty',
      models: 'Models',
      factory: 'Factory',
      knowledge: 'Knowledge',
      contact: 'Contact',
    },
    footer: {
      programs: 'Programs',
      oemBatteries: 'OEM Batteries',
      carBatteries: 'Car Batteries',
      truckBatteries: 'Truck Batteries',
      privateLabel: 'Private Label',
      heavyDutyBatteries: 'Heavy-Duty Batteries',
      resources: 'Resources',
      whatIsOem: 'What Is an OEM Battery?',
      oemVsOdm: 'OEM vs ODM vs Private Label',
      choosingManufacturer: 'Choosing a Manufacturer',
      supplierChecklist: 'Supplier Checklist',
      specGuide: 'Specification Guide',
      batteryFinder: 'Battery Finder',
      contact: 'Contact',
      requestQuote: 'Request OEM Quote',
      manufacturer: 'Manufacturer',
      factoryOverview: 'Factory overview',
    },
    statsbar: {
      factoryArea: 'Factory area',
      productionLines: 'Production lines',
      exportCountries: 'Export countries',
      qualitySystem: 'Automotive quality system',
    },
    cta: {
      defaultTitle: 'Start your OEM battery project',
      defaultText:
        'Tell us your specification, target market and annual volume. We will prepare an OEM or private-label program for review.',
    },
  },
  es: {
    skipToContent: 'Saltar al contenido',
    requestOemQuote: 'Solicitar Cotización OEM',
    whatsapp: 'WhatsApp',
    email: 'Correo electrónico',
    relationship:
      'Dingwei Battery ofrece programas de baterías OEM y de marca privada fabricadas por Chengguang Power Tech Co., Ltd. (fundada en 2002).',
    founded: 'Fundada en {year}',
    exportPorts: 'Puertos de exportación',
    certsLine: 'Las certificaciones mencionadas en este sitio pertenecen a {name}: {certs}.',
    legalLine:
      '© {year} {brand}. {legalName}. Todas las especificaciones son de referencia; confirme los valores finales con el fabricante antes de realizar un pedido.',
    explore: 'Explorar {name}',
    oemProcessTitle: 'Proceso OEM',
    oemProcessLead: 'Siete pasos desde la primera consulta hasta el envío.',
    batteryLabel: 'Batería',
    viewSpec: 'Ver especificación',
    breadcrumb: 'Ruta de navegación',
    nav: {
      home: 'Inicio',
      oem: 'OEM',
      privateLabel: 'Marca Privada',
      heavyDuty: 'Servicio Pesado',
      models: 'Modelos',
      factory: 'Fábrica',
      knowledge: 'Conocimiento',
      contact: 'Contacto',
    },
    footer: {
      programs: 'Programas',
      oemBatteries: 'Baterías OEM',
      carBatteries: 'Baterías de Automóvil',
      truckBatteries: 'Baterías de Camión',
      privateLabel: 'Marca Privada',
      heavyDutyBatteries: 'Baterías de Servicio Pesado',
      resources: 'Recursos',
      whatIsOem: '¿Qué es una batería OEM?',
      oemVsOdm: 'OEM vs ODM vs Marca Privada',
      choosingManufacturer: 'Cómo Elegir un Fabricante',
      supplierChecklist: 'Lista de Verificación del Proveedor',
      specGuide: 'Guía de Especificaciones',
      batteryFinder: 'Buscador de Baterías',
      contact: 'Contacto',
      requestQuote: 'Solicitar Cotización OEM',
      manufacturer: 'Fabricante',
      factoryOverview: 'Vista general de la fábrica',
    },
    statsbar: {
      factoryArea: 'Superficie de fábrica',
      productionLines: 'Líneas de producción',
      exportCountries: 'Países de exportación',
      qualitySystem: 'Sistema de calidad automotriz',
    },
    cta: {
      defaultTitle: 'Inicie su proyecto de baterías OEM',
      defaultText:
        'Indíquenos su especificación, mercado objetivo y volumen anual. Prepararemos un programa OEM o de marca privada para su revisión.',
    },
  },
  ar: {
    skipToContent: 'تخطَّ إلى المحتوى',
    requestOemQuote: 'اطلب عرض سعر OEM',
    whatsapp: 'واتساب',
    email: 'البريد الإلكتروني',
    relationship:
      'توفر Dingwei Battery برامج بطاريات OEM والعلامة الخاصة المصنّعة من قبل Chengguang Power Tech Co., Ltd. (تأسست عام 2002).',
    founded: 'تأسست عام {year}',
    exportPorts: 'موانئ التصدير',
    certsLine: 'الشهادات المشار إليها في هذا الموقع مملوكة لشركة {name}: {certs}.',
    legalLine:
      '© {year} {brand}. {legalName}. جميع المواصفات للمرجعية فقط؛ يُرجى تأكيد القيم النهائية مع الشركة المصنعة قبل الطلب.',
    explore: 'استكشف {name}',
    oemProcessTitle: 'عملية OEM',
    oemProcessLead: 'سبع خطوات من الاستشارة الأولى حتى الشحن.',
    batteryLabel: 'بطارية',
    viewSpec: 'عرض المواصفات',
    breadcrumb: 'مسار التنقل',
    nav: {
      home: 'الرئيسية',
      oem: 'OEM',
      privateLabel: 'علامة خاصة',
      heavyDuty: 'الخدمة الشاقة',
      models: 'الموديلات',
      factory: 'المصنع',
      knowledge: 'المعرفة',
      contact: 'اتصل بنا',
    },
    footer: {
      programs: 'البرامج',
      oemBatteries: 'بطاريات OEM',
      carBatteries: 'بطاريات السيارات',
      truckBatteries: 'بطاريات الشاحنات',
      privateLabel: 'علامة خاصة',
      heavyDutyBatteries: 'بطاريات الخدمة الشاقة',
      resources: 'الموارد',
      whatIsOem: 'ما هي بطارية OEM؟',
      oemVsOdm: 'OEM مقابل ODM مقابل العلامة الخاصة',
      choosingManufacturer: 'اختيار مُصنِّع',
      supplierChecklist: 'قائمة مراجعة المورد',
      specGuide: 'دليل المواصفات',
      batteryFinder: 'أداة البحث عن البطارية',
      contact: 'اتصل بنا',
      requestQuote: 'اطلب عرض سعر OEM',
      manufacturer: 'الشركة المصنعة',
      factoryOverview: 'نظرة عامة على المصنع',
    },
    statsbar: {
      factoryArea: 'مساحة المصنع',
      productionLines: 'خطوط الإنتاج',
      exportCountries: 'دول التصدير',
      qualitySystem: 'نظام جودة السيارات',
    },
    cta: {
      defaultTitle: 'ابدأ مشروع بطاريات OEM الخاص بك',
      defaultText:
        'أخبرنا بمواصفاتك وسوقك المستهدف وحجمك السنوي. سنُعدّ برنامج OEM أو علامة خاصة للمراجعة.',
    },
  },
  ru: {
    skipToContent: 'Перейти к содержимому',
    requestOemQuote: 'Запросить расчёт OEM',
    whatsapp: 'WhatsApp',
    email: 'Эл. почта',
    relationship:
      'Dingwei Battery предлагает программы OEM и частных марок аккумуляторов, произведённых Chengguang Power Tech Co., Ltd. (основана в 2002).',
    founded: 'Основана в {year}',
    exportPorts: 'Порты экспорта',
    certsLine: 'Сертификаты, указанные на этом сайте, принадлежат {name}: {certs}.',
    legalLine:
      '© {year} {brand}. {legalName}. Все характеристики приведены для справки; перед заказом уточняйте окончательные значения у производителя.',
    explore: 'Изучить {name}',
    oemProcessTitle: 'Процесс OEM',
    oemProcessLead: 'Семь шагов от первой консультации до отгрузки.',
    batteryLabel: 'Аккумулятор',
    viewSpec: 'Смотреть спецификацию',
    breadcrumb: 'Хлебные крошки',
    nav: {
      home: 'Главная',
      oem: 'OEM',
      privateLabel: 'Частная марка',
      heavyDuty: 'Тяжёлый режим',
      models: 'Модели',
      factory: 'Завод',
      knowledge: 'База знаний',
      contact: 'Контакты',
    },
    footer: {
      programs: 'Программы',
      oemBatteries: 'Аккумуляторы OEM',
      carBatteries: 'Автомобильные аккумуляторы',
      truckBatteries: 'Аккумуляторы для грузовиков',
      privateLabel: 'Частная марка',
      heavyDutyBatteries: 'Аккумуляторы тяжёлого режима',
      resources: 'Ресурсы',
      whatIsOem: 'Что такое OEM-аккумулятор?',
      oemVsOdm: 'OEM vs ODM vs Частная марка',
      choosingManufacturer: 'Выбор производителя',
      supplierChecklist: 'Чек-лист поставщика',
      specGuide: 'Руководство по спецификациям',
      batteryFinder: 'Подбор аккумулятора',
      contact: 'Контакты',
      requestQuote: 'Запросить расчёт OEM',
      manufacturer: 'Производитель',
      factoryOverview: 'Обзор завода',
    },
    statsbar: {
      factoryArea: 'Площадь завода',
      productionLines: 'Производственные линии',
      exportCountries: 'Страны экспорта',
      qualitySystem: 'Автомобильная система качества',
    },
    cta: {
      defaultTitle: 'Начните ваш проект OEM-аккумуляторов',
      defaultText:
        'Сообщите нам вашу спецификацию, целевой рынок и годовой объём. Мы подготовим программу OEM или частной марки на рассмотрение.',
    },
  },
};
