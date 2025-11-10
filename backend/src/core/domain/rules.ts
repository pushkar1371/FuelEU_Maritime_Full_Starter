export function percentDiff(comparison: number, baseline: number): number {
  return ((comparison / baseline) - 1) * 100;
}

export function isCompliant(actual: number, target = 89.3368): boolean {
  return actual <= target;
}
