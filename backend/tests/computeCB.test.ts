import { describe, it, expect } from 'vitest';
import { computeCB } from '../src/core/application/computeCB';

describe('computeCB', () => {
  it('computes CB sign correctly', () => {
    const { cb: cb1 } = computeCB(88.0, 100); // surplus
    const { cb: cb2 } = computeCB(91.0, 100); // deficit
    expect(cb1).toBeGreaterThan(0);
    expect(cb2).toBeLessThan(0);
  });
});
