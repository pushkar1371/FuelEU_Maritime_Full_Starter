import type { ApiPort } from '../../core/ports/apiPort';
import type { Route, ComparisonRow } from '../../core/domain/types';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient: ApiPort = {
  async getRoutes(): Promise<Route[]> {
    const r = await fetch(`${BASE}/routes`);
    return r.json();
  },
  async setBaseline(id: string) {
    await fetch(`${BASE}/routes/${id}/baseline`, { method: 'POST' });
  },
  async getComparison(): Promise<{ baseline: { id: string; ghgIntensity: number }; comparisons: ComparisonRow[] }> {
    const r = await fetch(`${BASE}/routes/comparison`);
    return r.json();
  },
  async getCB(year: number, shipId: string) {
    const r = await fetch(`${BASE}/compliance/cb?year=${year}&shipId=${encodeURIComponent(shipId)}`);
    return r.json();
  },
  async bank(shipId: string, year: number) {
    const r = await fetch(`${BASE}/banking/bank`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shipId, year }) });
    return r.json();
  },
  async applyBank(shipId: string, year: number, amount: number) {
    const r = await fetch(`${BASE}/banking/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ shipId, year, amount }) });
    return r.json();
  },
  async createPool(year: number, members: { shipId: string; cb_before: number }[]) {
    const r = await fetch(`${BASE}/pools`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ year, members }) });
    return r.json();
  }
};
