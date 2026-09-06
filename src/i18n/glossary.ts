// Terminology glossary for translator consistency across es/ar/ru.
// Standard codes (JIS, DIN, BCI, AS, SA, EN) and acronyms (CCA, Ah, RC, MOQ,
// OEM, ODM, SLI, AGM, EFB) are kept in English/acronym form in all locales.

export interface GlossaryEntry {
  en: string;
  es: string;
  ar: string;
  ru: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { en: 'battery', es: 'batería', ar: 'بطارية', ru: 'аккумулятор' },
  { en: 'automotive battery', es: 'batería de automóvil', ar: 'بطارية سيارة', ru: 'автомобильный аккумулятор' },
  { en: 'starting battery', es: 'batería de arranque', ar: 'بطارية تشغيل', ru: 'стартерный аккумулятор' },
  { en: 'heavy-duty battery', es: 'batería de servicio pesado', ar: 'بطارية الخدمة الشاقة', ru: 'аккумулятор тяжёлого режима' },
  { en: 'private label', es: 'marca privada', ar: 'علامة خاصة', ru: 'частная марка' },
  { en: 'lead time', es: 'plazo de entrega', ar: 'مهلة التسليم', ru: 'срок поставки' },
  { en: 'warranty', es: 'garantía', ar: 'ضمان', ru: 'гарантия' },
  { en: 'factory', es: 'fábrica', ar: 'المصنع', ru: 'завод' },
  { en: 'manufacturer', es: 'fabricante', ar: 'الشركة المصنعة', ru: 'производитель' },
  { en: 'quote / RFQ', es: 'cotización / solicitud de oferta', ar: 'عرض سعر / طلب عرض سعر', ru: 'расчёт / запрос предложения' },
  { en: 'specification', es: 'especificación', ar: 'المواصفات', ru: 'спецификация' },
  { en: 'voltage', es: 'voltaje', ar: 'الجهد', ru: 'напряжение' },
  { en: 'capacity', es: 'capacidad', ar: 'السعة', ru: 'ёмкость' },
  { en: 'terminal', es: 'terminal', ar: 'الطرف', ru: 'клемма' },
  { en: 'polarity', es: 'polaridad', ar: 'القطبية', ru: 'полярность' },
  { en: 'dimensions', es: 'dimensiones', ar: 'الأبعاد', ru: 'размеры' },
  { en: 'weight', es: 'peso', ar: 'الوزن', ru: 'вес' },
  { en: 'case size', es: 'tamaño de carcasa', ar: 'حجم الهيكل', ru: 'размер корпуса' },
  { en: 'cold cranking amps (CCA)', es: 'amperios de arranque en frío (CCA)', ar: 'أمبير التدوير البارد (CCA)', ru: 'ток холодной прокрутки (CCA)' },
  { en: 'reserve capacity (RC)', es: 'capacidad de reserva (RC)', ar: 'السعة الاحتياطية (RC)', ru: 'резервная ёмкость (RC)' },
  { en: 'amp-hour (Ah)', es: 'amperio-hora (Ah)', ar: 'أمبير-ساعة (Ah)', ru: 'ампер-час (Ah)' },
  { en: 'fitment', es: 'compatibilidad / montaje', ar: 'التوافق / التركيب', ru: 'установка / совместимость' },
  { en: 'discharge', es: 'descarga', ar: 'التفريغ', ru: 'разряд' },
  { en: 'charge', es: 'carga', ar: 'الشحن', ru: 'заряд' },
  { en: 'cranking', es: 'arranque', ar: 'التدوير', ru: 'прокрутка' },
  { en: 'tray', es: 'bandeja (de batería)', ar: 'حاضنة البطارية', ru: 'лоток (аккумулятора)' },
  { en: 'hold-down', es: 'fijación', ar: 'مثبّت البطارية', ru: 'крепление' },
  { en: 'vehicle', es: 'vehículo', ar: 'مركبة', ru: 'автомобиль / транспортное средство' },
  { en: 'fleet', es: 'flota', ar: 'أسطول', ru: 'автопарк' },
  { en: 'export', es: 'exportación', ar: 'تصدير', ru: 'экспорт' },
  { en: 'shipping', es: 'envío', ar: 'الشحن', ru: 'доставка' },
  { en: 'inquiry', es: 'consulta', ar: 'استفسار', ru: 'запрос' },
  { en: 'confirm on inquiry', es: 'confirmar al solicitar', ar: 'يُؤكَّد عند الاستفسار', ru: 'уточняется по запросу' },
  { en: 'for reference', es: 'de referencia', ar: 'للمرجعية', ru: 'справочно' },
];
