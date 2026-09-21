import type { BatteryModel } from './site';

import modelsJson from './battery-models-seed.json';

/**
 * 代表图回退表：以下 20 个型号暂无实拍图，使用「最接近的壳体尺寸/标准」的现有实拍图替代
 * （业主 2026-09-21 确认：OEM 站允许相近尺寸型号混用；图片全部为本站自有实拍，非图库图）。
 * 依据：battery-models-seed.json 的 dimensions_mm / case_size 就近匹配
 *（例如 80D26 → 65D26 同为 D26 壳体 256×175×220；BCI-49 → H8 353×175×190）。
 * 有实拍图的型号仍用自身图片，此表只作用于 image 字段为空的型号。
 */
const IMAGE_FALLBACK: Record<string, string> = {
  '65D23': '/images/product/range-55d23.webp',
  '80D26': '/images/product/model-65d26.webp',
  '115D31': '/images/product/model-105d31.webp',
  '75D23': '/images/product/range-55d23.webp',
  '65B24': '/images/product/model-55b24.webp',
  '85D26': '/images/product/model-65d26.webp',
  '95D26': '/images/product/model-65d26.webp',
  'H5': '/images/product/model-h6.webp',
  'H7': '/images/product/range-din80a.webp',
  'BCI-24': '/images/product/model-65d26.webp',
  'BCI-27': '/images/product/model-105d31.webp',
  'BCI-31': '/images/product/model-105d31.webp',
  'BCI-48': '/images/product/model-h6.webp',
  'BCI-49': '/images/product/model-h8.webp',
  'BCI-65': '/images/product/range-din80a.webp',
  'N70ZZ': '/images/product/model-105d31.webp',
  'N70': '/images/product/model-105d31.webp',
  '646': '/images/product/model-h6.webp',
  '657': '/images/product/model-h6.webp',
  '668': '/images/product/model-h6.webp',
};

export const batteryModels: BatteryModel[] = (modelsJson as BatteryModel[]).map((m) => ({
  ...m,
  image: m.image ?? IMAGE_FALLBACK[m.model.toUpperCase()],
}));

/** 该型号是否在使用代表图（页面上是同类尺寸的实拍图，非该型号自身照片） */
export function usesRepresentativeImage(model: string): boolean {
  const m = modelsJson.find((x) => x.model.toLowerCase() === model.toLowerCase());
  return Boolean(!m?.image && IMAGE_FALLBACK[model.toUpperCase()]);
}

export function modelPath(model: string): string {
  return `/data/${model.toLowerCase()}/`;
}

export function findModel(model: string): BatteryModel | undefined {
  return batteryModels.find((m) => m.model.toLowerCase() === model.toLowerCase());
}

export function ccaLabel(model: BatteryModel): string {
  return `${model.cca.value} CCA (reference)`;
}
