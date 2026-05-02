/**
 * PBT: Exercise completion percentage
 * **Validates: Requirements 14.4**
 *
 * Property 9: completion percentage = Math.round((completedCount / totalCount) * 100),
 * always between 0 and 100.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateCompletionPercentage } from '@/lib/business-logic';

describe('Exercise Completion Percentage (Property 9)', () => {
  it('percentage is always between 0 and 100 inclusive', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        fc.integer({ min: 0, max: 1000 }),
        (total, completed) => {
          const pct = calculateCompletionPercentage(total, completed);
          expect(pct).toBeGreaterThanOrEqual(0);
          expect(pct).toBeLessThanOrEqual(100);
        }
      ),
      { numRuns: 500 }
    );
  });

  it('percentage equals Math.round((completed / total) * 100) for valid inputs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1000 }).chain((total) =>
          fc.record({
            total: fc.constant(total),
            completed: fc.integer({ min: 0, max: total }),
          })
        ),
        ({ total, completed }) => {
          const pct = calculateCompletionPercentage(total, completed);
          const expected = Math.round((completed / total) * 100);
          expect(pct).toBe(expected);
        }
      ),
      { numRuns: 500 }
    );
  });

  it('0 exercises yields 0 percent', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (completed) => {
        expect(calculateCompletionPercentage(0, completed)).toBe(0);
      }),
      { numRuns: 100 }
    );
  });

  it('all completed yields 100 percent', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1000 }), (total) => {
        expect(calculateCompletionPercentage(total, total)).toBe(100);
      }),
      { numRuns: 200 }
    );
  });

  it('none completed yields 0 percent', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1000 }), (total) => {
        expect(calculateCompletionPercentage(total, 0)).toBe(0);
      }),
      { numRuns: 200 }
    );
  });

  it('completed clamped to total when exceeding', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 500 }),
        fc.integer({ min: 1, max: 500 }),
        (total, extra) => {
          const pct = calculateCompletionPercentage(total, total + extra);
          expect(pct).toBe(100);
        }
      ),
      { numRuns: 200 }
    );
  });
});
