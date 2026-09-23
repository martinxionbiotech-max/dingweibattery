import type { Locale } from './ui';

/**
 * Fitment 置信度体系（§11）四级 + 图例文案，5 语言。
 * 措辞遵循 §36：一律「compatible reference（兼容参考）」，绝不写「OEM replacement」。
 * 级别定义对齐 §11：
 *   HIGH       — 多个可信来源或制造商文档
 *   MEDIUM     — 技术参数匹配的独立可信来源
 *   LOW        — 有限的第三方参考
 *   UNVERIFIED — 证据不足（本站车型级 fitment 无数据，统一落此级）
 */

export type FitmentLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNVERIFIED';

export const FITMENT_LEVELS: FitmentLevel[] = ['HIGH', 'MEDIUM', 'LOW', 'UNVERIFIED'];

export interface FitmentStrings {
  label: string;
  legendTitle: string;
  compatibleReference: string;
  levels: Record<FitmentLevel, { name: string; desc: string }>;
}

export const FITMENT: Record<Locale, FitmentStrings> = {
  en: {
    label: 'Fitment confidence',
    legendTitle: 'How fitment confidence is rated',
    compatibleReference:
      'Compatible reference only — not OEM confirmation. Always verify against the vehicle, terminal layout and electrical configuration before ordering.',
    levels: {
      HIGH: { name: 'HIGH', desc: 'Multiple credible sources or manufacturer documentation.' },
      MEDIUM: { name: 'MEDIUM', desc: 'Credible independent source with matching technical parameters.' },
      LOW: { name: 'LOW', desc: 'Limited third-party reference.' },
      UNVERIFIED: { name: 'UNVERIFIED', desc: 'Not enough evidence — compatible reference only, not OEM confirmation.' },
    },
  },
  es: {
    label: 'Confianza de compatibilidad',
    legendTitle: 'Cómo se califica la confianza de compatibilidad',
    compatibleReference:
      'Solo referencia compatible — no es una confirmación OEM. Verifique siempre contra el vehículo, la disposición de terminales y la configuración eléctrica antes de pedir.',
    levels: {
      HIGH: { name: 'ALTO', desc: 'Múltiples fuentes creíbles o documentación del fabricante.' },
      MEDIUM: { name: 'MEDIO', desc: 'Fuente independiente creíble con parámetros técnicos coincidentes.' },
      LOW: { name: 'BAJO', desc: 'Referencia limitada de terceros.' },
      UNVERIFIED: { name: 'NO VERIFICADO', desc: 'Evidencia insuficiente — solo referencia compatible, no confirmación OEM.' },
    },
  },
  ar: {
    label: 'درجة موثوقية التوافق',
    legendTitle: 'كيف تُقيَّم درجة موثوقية التوافق',
    compatibleReference:
      'مرجع توافق فقط — وليس تأكيدًا من OEM. تحقق دائمًا من المركبة وترتيب الأطراف والتكوين الكهربائي قبل الطلب.',
    levels: {
      HIGH: { name: 'مرتفع', desc: 'مصادر متعددة موثوقة أو وثائق الشركة المصنعة.' },
      MEDIUM: { name: 'متوسط', desc: 'مصدر مستقل موثوق بمعايير تقنية مطابقة.' },
      LOW: { name: 'منخفض', desc: 'مرجع محدود من طرف ثالث.' },
      UNVERIFIED: { name: 'غير مُتحقق', desc: 'أدلة غير كافية — مرجع توافق فقط، وليس تأكيدًا من OEM.' },
    },
  },
  ru: {
    label: 'Достоверность совместимости',
    legendTitle: 'Как оценивается достоверность совместимости',
    compatibleReference:
      'Только справочная совместимость — не подтверждение OEM. Всегда сверяйтесь с автомобилем, расположением клемм и электрической конфигурацией перед заказом.',
    levels: {
      HIGH: { name: 'ВЫСОКИЙ', desc: 'Несколько надёжных источников или документация производителя.' },
      MEDIUM: { name: 'СРЕДНИЙ', desc: 'Надёжный независимый источник с совпадающими техническими параметрами.' },
      LOW: { name: 'НИЗКИЙ', desc: 'Ограниченная ссылка третьей стороны.' },
      UNVERIFIED: { name: 'НЕ ПРОВЕРЕНО', desc: 'Недостаточно данных — только справочная совместимость, не подтверждение OEM.' },
    },
  },
  zh: {
    label: '适配置信度',
    legendTitle: '适配置信度如何评级',
    compatibleReference:
      '仅为兼容参考——非 OEM 确认。下单前请务必对照车辆、端子布局与电气配置核验。',
    levels: {
      HIGH: { name: '高', desc: '多个可信来源或制造商文档。' },
      MEDIUM: { name: '中', desc: '技术参数匹配的独立可信来源。' },
      LOW: { name: '低', desc: '有限的第三方参考。' },
      UNVERIFIED: { name: '未核验', desc: '证据不足——仅为兼容参考，非 OEM 确认。' },
    },
  },
};
