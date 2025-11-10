import { percentDiff, isCompliant } from '../domain/rules';

export function compare(baselineGhg: number, items: { id: string; ghg: number }[]) {
  return items.map((r) => ({
    id: r.id,
    ghgIntensity: r.ghg,
    percentDiff: percentDiff(r.ghg, baselineGhg),
    compliant: isCompliant(r.ghg)
  }));
}
