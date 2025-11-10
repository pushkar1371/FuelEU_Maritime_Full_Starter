import type { PoolMember } from '../domain/types';

export function createPool(year: number, members: PoolMember[]) {
  const sum = members.reduce((acc, m) => acc + m.cb_before, 0);
  if (sum < 0) throw new Error('Pool sum must be >= 0.');

  // Greedy: sort descending by cb_before, move surplus to the most negative deficits first
  const sorted = [...members].sort((a, b) => b.cb_before - a.cb_before);
  let surplusIdx = 0;
  let deficitIdx = sorted.length - 1;

  while (surplusIdx < deficitIdx) {
    if (sorted[surplusIdx].cb_before <= 0) break; // no more surplus
    if (sorted[deficitIdx].cb_before >= 0) { deficitIdx--; continue; }

    const give = Math.min(sorted[surplusIdx].cb_before, -sorted[deficitIdx].cb_before);
    sorted[surplusIdx].cb_before -= give;
    sorted[deficitIdx].cb_before += give;

    if (sorted[deficitIdx].cb_before >= 0) deficitIdx--;
    if (sorted[surplusIdx].cb_before <= 0) surplusIdx++;
  }

  // Validate exit conditions
  for (const m of sorted) {
    if (m.cb_before < -1e-9) throw new Error('Surplus ship exited negative or deficit made worse.');
  }

  return sorted.map((m) => ({ shipId: m.shipId, cb_before: m.cb_after ?? m.cb_before, cb_after: m.cb_before }));
}
