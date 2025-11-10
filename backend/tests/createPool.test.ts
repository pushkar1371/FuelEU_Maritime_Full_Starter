import { describe, it, expect } from 'vitest';
import { createPool } from '../src/core/application/createPool';

describe('createPool', () => {
  it('balances to non-negative sum', () => {
    const members = [
      { shipId: 'A', cb_before: 1000 },
      { shipId: 'B', cb_before: -600 },
      { shipId: 'C', cb_before: -200 }
    ];
    const out = createPool(2025, members);
    expect(out.find((m) => m.shipId === 'B')!.cb_after).toBeGreaterThanOrEqual(0);
    expect(out.find((m) => m.shipId === 'C')!.cb_after).toBeGreaterThanOrEqual(0);
  });
});
