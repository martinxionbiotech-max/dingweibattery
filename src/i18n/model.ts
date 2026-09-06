import type { Locale } from './ui';

// 型号数据字段的翻译映射。seed json 保持英文(真相源)，模板层用这些函数按 locale 翻译展示。

const applicationMap: Record<string, Record<Locale, string>> = {
  'Asian compact': {
    en: 'Asian compact',
    es: 'Compacto asiático',
    ar: 'سيارة آسيوية مدمجة',
    ru: 'Азиатский компакт',
  },
  'Asian compact / hybrid auxiliary': {
    en: 'Asian compact / hybrid auxiliary',
    es: 'Compacto asiático / auxiliar híbrido',
    ar: 'سيارة آسيوية مدمجة / مساعد هجين',
    ru: 'Азиатский компакт / гибридный вспомогательный',
  },
  'European SUV / premium': {
    en: 'European SUV / premium',
    es: 'SUV europeo / premium',
    ar: 'سيارة دفع رباعي أوروبية / فاخرة',
    ru: 'Европейский SUV / премиум',
  },
  'European compact / start-stop': {
    en: 'European compact / start-stop',
    es: 'Compacto europeo / start-stop',
    ar: 'سيارة أوروبية مدمجة / تشغيل-إيقاف',
    ru: 'Европейский компакт / start-stop',
  },
  'European passenger car / start-stop': {
    en: 'European passenger car / start-stop',
    es: 'Turismo europeo / start-stop',
    ar: 'سيارة ركاب أوروبية / تشغيل-إيقاف',
    ru: 'Европейский легковой / start-stop',
  },
  'European premium / high electrical load': {
    en: 'European premium / high electrical load',
    es: 'Premium europeo / alta carga eléctrica',
    ar: 'سيارة أوروبية فاخرة / حمل كهربائي عالٍ',
    ru: 'Европейский премиум / высокая электрическая нагрузка',
  },
  'Heavy SUV / 4WD / marine starting': {
    en: 'Heavy SUV / 4WD / marine starting',
    es: 'SUV pesado / 4x4 / arranque marino',
    ar: 'سيارة دفع رباعي ثقيلة / دفع رباعي / تشغيل بحري',
    ru: 'Тяжёлый SUV / 4WD / морской запуск',
  },
  'Heavy truck / bus / commercial vehicle': {
    en: 'Heavy truck / bus / commercial vehicle',
    es: 'Camión pesado / autobús / vehículo comercial',
    ar: 'شاحنة ثقيلة / حافلة / مركبة تجارية',
    ru: 'Тяжёлый грузовик / автобус / коммерческий транспорт',
  },
  'Light commercial / SUV': {
    en: 'Light commercial / SUV',
    es: 'Comercial ligero / SUV',
    ar: 'مركبة تجارية خفيفة / دفع رباعي',
    ru: 'Лёгкий коммерческий / SUV',
  },
  'Mid-size sedan with high accessory load': {
    en: 'Mid-size sedan with high accessory load',
    es: 'Berlina media con alta carga de accesorios',
    ar: 'سيارة سيدان متوسطة بحمل ملحقات عالٍ',
    ru: 'Среднеразмерный седан с высокой нагрузкой от аксессуаров',
  },
  'Passenger car / SUV': {
    en: 'Passenger car / SUV',
    es: 'Turismo / SUV',
    ar: 'سيارة ركاب / دفع رباعي',
    ru: 'Легковой / SUV',
  },
  'Passenger car / light commercial': {
    en: 'Passenger car / light commercial',
    es: 'Turismo / comercial ligero',
    ar: 'سيارة ركاب / تجارية خفيفة',
    ru: 'Легковой / лёгкий коммерческий',
  },
  'Passenger car / light truck': {
    en: 'Passenger car / light truck',
    es: 'Turismo / camión ligero',
    ar: 'سيارة ركاب / شاحنة خفيفة',
    ru: 'Легковой / лёгкий грузовик',
  },
  'Passenger car / mid-size': {
    en: 'Passenger car / mid-size',
    es: 'Turismo / tamaño medio',
    ar: 'سيارة ركاب / متوسطة',
    ru: 'Легковой / средний',
  },
  'Passenger car / mid-size sedan': {
    en: 'Passenger car / mid-size sedan',
    es: 'Turismo / berlina media',
    ar: 'سيارة ركاب / سيدان متوسطة',
    ru: 'Легковой / среднеразмерный седан',
  },
  'Passenger car / premium': {
    en: 'Passenger car / premium',
    es: 'Turismo / premium',
    ar: 'سيارة ركاب / فاخرة',
    ru: 'Легковой / премиум',
  },
  'Pickup / mid-truck (e.g. Hilux)': {
    en: 'Pickup / mid-truck (e.g. Hilux)',
    es: 'Pickup / camión medio (p. ej. Hilux)',
    ar: 'بيك أب / شاحنة متوسطة (مثل هايلوكس)',
    ru: 'Пикап / средний грузовик (напр. Hilux)',
  },
  'Premium / high electrical load': {
    en: 'Premium / high electrical load',
    es: 'Premium / alta carga eléctrica',
    ar: 'فاخرة / حمل كهربائي عالٍ',
    ru: 'Премиум / высокая электрическая нагрузка',
  },
  'SUV / light commercial diesel': {
    en: 'SUV / light commercial diesel',
    es: 'SUV / comercial ligero diésel',
    ar: 'دفع رباعي / تجارية خفيفة ديزل',
    ru: 'SUV / лёгкий коммерческий дизель',
  },
  'SUV / light commercial diesel / 4WD': {
    en: 'SUV / light commercial diesel / 4WD',
    es: 'SUV / comercial ligero diésel / 4x4',
    ar: 'دفع رباعي / تجارية خفيفة ديزل / دفع رباعي',
    ru: 'SUV / лёгкий коммерческий дизель / 4WD',
  },
  'Truck / bus / light commercial': {
    en: 'Truck / bus / light commercial',
    es: 'Camión / autobús / comercial ligero',
    ar: 'شاحنة / حافلة / تجارية خفيفة',
    ru: 'Грузовик / автобус / лёгкий коммерческий',
  },
};

export function translateApplication(app: string, locale: Locale): string {
  return applicationMap[app]?.[locale] ?? app;
}

export function translateTechnology(tech: string, locale: Locale): string {
  const m: Record<string, Record<Locale, string>> = {
    'Maintenance-free (免维护)': {
      en: 'Maintenance-free',
      es: 'Sin mantenimiento',
      ar: 'لا تحتاج صيانة',
      ru: 'Необслуживаемая',
    },
  };
  return m[tech]?.[locale] ?? tech;
}

export function translateConfidence(conf: string, locale: Locale): string {
  const m: Record<string, Record<Locale, string>> = {
    PARTIALLY_VERIFIED: {
      en: 'PARTIALLY VERIFIED',
      es: 'PARCIALMENTE VERIFICADO',
      ar: 'تم التحقق جزئيًا',
      ru: 'ЧАСТИЧНО ПРОВЕРЕНО',
    },
    REFERENCE: {
      en: 'REFERENCE',
      es: 'REFERENCIA',
      ar: 'مرجعي',
      ru: 'СПРАВОЧНО',
    },
  };
  return m[conf]?.[locale] ?? conf;
}

export function translateCcaBasis(basis: string, locale: Locale): string {
  const refWord: Record<Locale, string> = { en: 'reference', es: 'referencia', ar: 'مرجع', ru: 'справочно' };
  const typicalWord: Record<Locale, string> = { en: 'typical', es: 'típica', ar: 'نموذجي', ru: 'типичное' };
  const interpolatedWord: Record<Locale, string> = { en: 'interpolated', es: 'interpolada', ar: 'مُستقرَب', ru: 'интерполировано' };
  let s = basis.replace(/reference/g, refWord[locale]);
  s = s.replace(/typical/g, typicalWord[locale]);
  s = s.replace(/interpolated/g, interpolatedWord[locale]);
  return s;
}

export function translateCcaNote(note: string, locale: Locale): string {
  const refValue: Record<Locale, string> = { en: 'reference value', es: 'valor de referencia', ar: 'قيمة مرجعية', ru: 'справочное значение' };
  const confirm: Record<Locale, string> = { en: 'confirm with manufacturer', es: 'confirmar con el fabricante', ar: 'يُرجى التأكيد مع الشركة المصنعة', ru: 'уточните у производителя' };
  let s = note.replace(/reference value/g, refValue[locale]);
  s = s.replace(/confirm with manufacturer/g, confirm[locale]);
  return s;
}
