export type Route = {
  id: string; // DB id (uuid-ish)
  routeId: string; // e.g., R001
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number; // gCO2e/MJ
  fuelConsumptionTons: number; // t
  distanceKm: number; // km
  totalEmissionsTons: number; // t (informational)
  isBaseline?: boolean;
};

export type CBRecord = {
  shipId: string;
  year: number;
  cb_gco2eq: number; // positive -> surplus, negative -> deficit
};

export type BankEntry = {
  id: string;
  shipId: string;
  year: number;
  amount_gco2eq: number; // positive values only
};

export type PoolMember = {
  shipId: string;
  cb_before: number; // can be +/-
  cb_after?: number;
};

export const TARGET_2025 = 89.3368; // gCO2e/MJ
export const ENERGY_PER_TON_MJ = 41000; // MJ per ton
