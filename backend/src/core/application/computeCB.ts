import { ENERGY_PER_TON_MJ, TARGET_2025 } from '../domain/types';

export function computeCB(actualIntensity: number, fuelConsumptionTons: number, target = TARGET_2025) {
  const energy = fuelConsumptionTons * ENERGY_PER_TON_MJ;
  const delta = target - actualIntensity; // gCO2e/MJ
  const cb = delta * energy; // gCO2e
  return { energy, cb };
}
