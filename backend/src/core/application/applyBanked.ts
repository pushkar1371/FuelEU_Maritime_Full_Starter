export function applyBanked(deficitCB: number, availableBanked: number, requested: number) {
  if (deficitCB >= 0) throw new Error('No deficit to apply against.');
  if (requested <= 0) throw new Error('Requested amount must be > 0.');
  if (requested > availableBanked) throw new Error('Insufficient banked surplus.');
  const newCB = deficitCB + requested; // deficitCB is negative; adding reduces deficit
  return { applied: requested, cb_after: newCB };
}
