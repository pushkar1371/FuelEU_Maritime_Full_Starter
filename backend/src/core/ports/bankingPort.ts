import type { BankEntry } from '../domain/types';

export interface BankingRepo {
  list(shipId: string, year: number): Promise<BankEntry[]>;
  totalAvailable(shipId: string, upToYear: number): Promise<number>;
  add(entry: BankEntry): Promise<void>;
}
