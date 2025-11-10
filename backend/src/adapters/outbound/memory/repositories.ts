import type { Route, CBRecord, BankEntry } from '../../../core/domain/types';
import type { RouteRepo } from '../../../core/ports/routePort';
import type { ComplianceRepo } from '../../../core/ports/compliancePort';
import type { BankingRepo } from '../../../core/ports/bankingPort';
import type { PoolRepo } from '../../../core/ports/poolPort';
import { randomUUID } from 'node:crypto';

const routes: Route[] = [
  { id: randomUUID(), routeId: 'R001', vesselType: 'Container', fuelType: 'HFO', year: 2024, ghgIntensity: 91.0, fuelConsumptionTons: 5000, distanceKm: 12000, totalEmissionsTons: 4500, isBaseline: true },
  { id: randomUUID(), routeId: 'R002', vesselType: 'BulkCarrier', fuelType: 'LNG', year: 2024, ghgIntensity: 88.0, fuelConsumptionTons: 4800, distanceKm: 11500, totalEmissionsTons: 4200 },
  { id: randomUUID(), routeId: 'R003', vesselType: 'Tanker', fuelType: 'MGO', year: 2024, ghgIntensity: 93.5, fuelConsumptionTons: 5100, distanceKm: 12500, totalEmissionsTons: 4700 },
  { id: randomUUID(), routeId: 'R004', vesselType: 'RoRo', fuelType: 'HFO', year: 2025, ghgIntensity: 89.2, fuelConsumptionTons: 4900, distanceKm: 11800, totalEmissionsTons: 4300 },
  { id: randomUUID(), routeId: 'R005', vesselType: 'Container', fuelType: 'LNG', year: 2025, ghgIntensity: 90.5, fuelConsumptionTons: 4950, distanceKm: 11900, totalEmissionsTons: 4400 }
];

const cbRecords = new Map<string, CBRecord>(); // key: shipId:year
const bank: BankEntry[] = [];

export const MemoryRouteRepo = (): RouteRepo => ({
  async getAll() { return routes; },
  async setBaseline(id: string) {
    routes.forEach((r) => (r.isBaseline = r.id === id));
  },
  async getBaseline() {
    return routes.find((r) => r.isBaseline);
  }
});

export const MemoryComplianceRepo = (): ComplianceRepo => ({
  async upsert(cb) { cbRecords.set(`${cb.shipId}:${cb.year}`, cb); },
  async get(shipId, year) { return cbRecords.get(`${shipId}:${year}`); }
});

export const MemoryBankingRepo = (): BankingRepo => ({
  async list(shipId, year) { return bank.filter((b) => b.shipId === shipId && b.year === year); },
  async totalAvailable(shipId, upToYear) {
    return bank.filter((b) => b.shipId === shipId && b.year <= upToYear).reduce((acc, x) => acc + x.amount_gco2eq, 0);
  },
  async add(entry) { bank.push(entry); }
});

export const MemoryPoolRepo = (): PoolRepo => ({
  async create(year, members) {
    const id = randomUUID();
    // In-memory: simply echo
    return { poolId: id, members };
  }
});
