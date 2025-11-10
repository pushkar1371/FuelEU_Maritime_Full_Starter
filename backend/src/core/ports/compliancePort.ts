import type { CBRecord } from '../domain/types';

export interface ComplianceRepo {
  upsert(cb: CBRecord): Promise<void>;
  get(shipId: string, year: number): Promise<CBRecord | undefined>;
}
