import type { PoolMember } from '../domain/types';

export interface PoolRepo {
  create(year: number, members: PoolMember[]): Promise<{ poolId: string; members: PoolMember[] }>;
}
