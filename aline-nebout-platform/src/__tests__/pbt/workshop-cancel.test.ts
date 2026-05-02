/**
 * PBT: Cancellation + waitlist promotion
 * **Validates: Requirements 13.6**
 *
 * Property 8: after cancellation, if waitlist exists, first waitlisted person
 * gets promoted. Cancellation decrements current_count.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  processCancellation,
  type Workshop,
  type WaitlistEntry,
} from '@/lib/business-logic';

function fullWorkshopArb(): fc.Arbitrary<Workshop> {
  return fc.integer({ min: 1, max: 100 }).map((cap) => ({
    id: 'test-workshop',
    max_capacity: cap,
    current_count: cap,
    status: 'full' as const,
  }));
}

function waitlistArb(
  minLength: number = 0,
  maxLength: number = 20
): fc.Arbitrary<WaitlistEntry[]> {
  return fc
    .array(
      fc.record({
        email: fc.emailAddress(),
        name: fc.string({ minLength: 1, maxLength: 50 }),
      }),
      { minLength, maxLength }
    )
    .map((entries) =>
      entries.map((e, i) => ({
        ...e,
        position: i + 1,
      }))
    );
}

describe('Workshop Cancellation + Waitlist Promotion (Property 8)', () => {
  it('cancellation with empty waitlist decrements count by 1', () => {
    fc.assert(
      fc.property(fullWorkshopArb(), (workshop) => {
        const result = processCancellation(workshop, []);

        expect(result.new_count).toBe(workshop.current_count - 1);
        expect(result.promoted_email).toBeNull();
        expect(result.new_status).toBe('upcoming');
      }),
      { numRuns: 200 }
    );
  });

  it('cancellation with waitlist promotes first person (lowest position)', () => {
    fc.assert(
      fc.property(
        fullWorkshopArb(),
        waitlistArb(1, 20),
        (workshop, waitlist) => {
          const result = processCancellation(workshop, waitlist);

          // First person in waitlist (position 1) should be promoted
          const sorted = [...waitlist].sort((a, b) => a.position - b.position);
          expect(result.promoted_email).toBe(sorted[0].email);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('after cancellation + promotion, count stays consistent', () => {
    fc.assert(
      fc.property(
        fullWorkshopArb(),
        waitlistArb(1, 20),
        (workshop, waitlist) => {
          const result = processCancellation(workshop, waitlist);

          // Count decremented by 1 then incremented by 1 (promotion)
          // So net effect: count stays the same or goes down by 0
          expect(result.new_count).toBe(workshop.current_count - 1 + 1);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('waitlist ordering is preserved — lowest position promoted first', () => {
    fc.assert(
      fc.property(
        fullWorkshopArb(),
        fc
          .array(
            fc.record({
              email: fc.emailAddress(),
              name: fc.string({ minLength: 1, maxLength: 50 }),
              position: fc.integer({ min: 1, max: 100 }),
            }),
            { minLength: 2, maxLength: 20 }
          )
          .filter((entries) => {
            const positions = entries.map((e) => e.position);
            return new Set(positions).size === positions.length;
          }),
        (workshop, waitlist) => {
          const result = processCancellation(workshop, waitlist);

          const minPosition = Math.min(...waitlist.map((w) => w.position));
          const expectedPromoted = waitlist.find(
            (w) => w.position === minPosition
          );

          expect(result.promoted_email).toBe(expectedPromoted!.email);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('count never goes below 0', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.constant('test-workshop'),
          max_capacity: fc.integer({ min: 1, max: 100 }),
          current_count: fc.integer({ min: 0, max: 100 }),
          status: fc.constant('upcoming' as const),
        }),
        waitlistArb(0, 10),
        (workshop, waitlist) => {
          const result = processCancellation(workshop, waitlist);
          expect(result.new_count).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 200 }
    );
  });
});
