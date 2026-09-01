import type { BatteryModel } from './site';

import modelsJson from './battery-models-seed.json';

export const batteryModels = modelsJson as BatteryModel[];

export function modelPath(model: string): string {
  return `/data/${model.toLowerCase()}/`;
}

export function findModel(model: string): BatteryModel | undefined {
  return batteryModels.find((m) => m.model.toLowerCase() === model.toLowerCase());
}

export function ccaLabel(model: BatteryModel): string {
  return `${model.cca.value} CCA (reference)`;
}
