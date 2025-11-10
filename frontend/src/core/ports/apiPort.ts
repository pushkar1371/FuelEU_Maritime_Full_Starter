import type { Route, ComparisonRow } from '../domain/types';

export interface ApiPort {
  getRoutes(): Promise<Route[]>;
  setBaseline(id: string): Promise<void>;
  getComparison(): Promise<{ baseline: { id: string; ghgIntensity: number }; comparisons: ComparisonRow[] }>;
  getCB(year: number, shipId: string): Promise<{ cb_before: number }>;
  bank(shipId: string, year: number): Promise<{ cb_before: number; applied: number; cb_after: number }>;
  applyBank(shipId: string, year: number, amount: number): Promise<{ cb_before: number; applied: number; cb_after: number }>;
  createPool(year: number, members: { shipId: string; cb_before: number }[]): Promise<{ poolId: string; members: any[]; poolSum: number }>;
}
