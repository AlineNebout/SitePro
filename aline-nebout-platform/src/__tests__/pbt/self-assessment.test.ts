/**
 * PBT: Self-assessment threshold
 * **Validates: Requirements 7b.3**
 *
 * Property 4: recommendation shown iff checked count >= 3.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { shouldShowRecommendation } from '@/lib/business-logic';

describe('Self-Assessment Threshold (Property 4)', () => {
  it('recommendation shown iff checked count >= threshold (default 3)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 0, maxLength: 20 }),
        (checkedItems) => {
          const count = checkedItems.filter(Boolean).length;
          const result = shouldShowRecommendation(checkedItems);

          if (count >= 3) {
            expect(result).toBe(true);
          } else {
            expect(result).toBe(false);
          }
        }
      ),
      { numRuns: 500 }
    );
  });

  it('recommendation shown iff checked count >= custom threshold', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 0, maxLength: 20 }),
        fc.integer({ min: 1, max: 15 }),
        (checkedItems, threshold) => {
          const count = checkedItems.filter(Boolean).length;
          const result = shouldShowRecommendation(checkedItems, threshold);

          expect(result).toBe(count >= threshold);
        }
      ),
      { numRuns: 500 }
    );
  });

  it('empty checklist never shows recommendation', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 15 }), (threshold) => {
        expect(shouldShowRecommendation([], threshold)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('all-false checklist never shows recommendation', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        fc.integer({ min: 1, max: 15 }),
        (length, threshold) => {
          const items = Array(length).fill(false);
          expect(shouldShowRecommendation(items, threshold)).toBe(false);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('all-true checklist shows recommendation when length >= threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        fc.integer({ min: 1, max: 15 }),
        (length, threshold) => {
          const items = Array(length).fill(true);
          const result = shouldShowRecommendation(items, threshold);
          expect(result).toBe(length >= threshold);
        }
      ),
      { numRuns: 200 }
    );
  });
});
