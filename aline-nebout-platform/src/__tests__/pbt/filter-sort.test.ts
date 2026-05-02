/**
 * PBT: Collection filter/sort correctness
 * **Validates: Requirements 9.2, 9.3**
 *
 * Property 3: filtering preserves all matching items and excludes non-matching.
 * Sorting maintains order invariant.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterArticlesBySphere, type Article } from '@/lib/business-logic';

const SPHERES = ['motor', 'emotional', 'cognitive'];

function articleArb(): fc.Arbitrary<Article> {
  return fc.record({
    slug: fc.string({ minLength: 1, maxLength: 30 }),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    spheres: fc.subarray(SPHERES, { minLength: 1 }),
    sort_order: fc.integer({ min: 0, max: 1000 }),
  });
}

function articlesArb(): fc.Arbitrary<Article[]> {
  return fc.array(articleArb(), { minLength: 0, maxLength: 30 });
}

describe('Collection Filter/Sort Correctness (Property 3)', () => {
  it('filtering preserves all matching items', () => {
    fc.assert(
      fc.property(
        articlesArb(),
        fc.constantFrom(...SPHERES),
        (articles, sphere) => {
          const result = filterArticlesBySphere(articles, sphere);
          const expected = articles.filter((a) => a.spheres.includes(sphere));

          // Every matching article should be in the result
          for (const article of expected) {
            expect(result).toContainEqual(article);
          }
          expect(result.length).toBe(expected.length);
        }
      ),
      { numRuns: 300 }
    );
  });

  it('filtering excludes all non-matching items', () => {
    fc.assert(
      fc.property(
        articlesArb(),
        fc.constantFrom(...SPHERES),
        (articles, sphere) => {
          const result = filterArticlesBySphere(articles, sphere);

          // No non-matching article should be in the result
          for (const article of result) {
            expect(article.spheres).toContain(sphere);
          }
        }
      ),
      { numRuns: 300 }
    );
  });

  it('null or "all" filter returns all articles', () => {
    fc.assert(
      fc.property(
        articlesArb(),
        fc.constantFrom(null, 'all'),
        (articles, filter) => {
          const result = filterArticlesBySphere(articles, filter);
          expect(result.length).toBe(articles.length);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('results maintain sort_order invariant (ascending)', () => {
    fc.assert(
      fc.property(
        articlesArb(),
        fc.constantFrom(null, ...SPHERES),
        (articles, sphere) => {
          const result = filterArticlesBySphere(articles, sphere);

          for (let i = 1; i < result.length; i++) {
            expect(result[i].sort_order).toBeGreaterThanOrEqual(
              result[i - 1].sort_order
            );
          }
        }
      ),
      { numRuns: 300 }
    );
  });

  it('filtering is idempotent', () => {
    fc.assert(
      fc.property(
        articlesArb(),
        fc.constantFrom(...SPHERES),
        (articles, sphere) => {
          const first = filterArticlesBySphere(articles, sphere);
          const second = filterArticlesBySphere(first, sphere);

          expect(second).toEqual(first);
        }
      ),
      { numRuns: 200 }
    );
  });
});
