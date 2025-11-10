export function bankSurplus(currentCB: number) {
  if (currentCB <= 0) {
    throw new Error('CB is non-positive; nothing to bank.');
  }
  return currentCB; // amount to bank equals positive CB
}
