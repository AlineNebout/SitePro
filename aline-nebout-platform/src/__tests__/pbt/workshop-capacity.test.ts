/**
 * PBT: Workshop booking capacity invariant
 * **Validates: Requirements 13.1, 13.3, 13.5**
 *
 * Property 7: current_count should never exceed max_capacity.
 * When full, new bookings go to waitlist.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { processBooking, type Workshop } from '@/lib/business-logic';

function workshopArb(): fc.Arbitrary<Workshop> {
  return fc
    .record({
      max_capacity: fc.integer({ min: 1, max: 100 }),
      current_count_ratio: fc.double({ min: 0, max: 1, noNaN: true }),
    })
    .map(({ max_capacity, current_count_ratio }) => ({
      id: 'test-workshop',
      max_capacity,
      current_count: Math.floor(current_count_ratio * max_capacity),
      status: 'upcoming' as const,
    }));
}

describe('Workshop Booking Capacity Invariant (Property 7)', () => {
  it('current_count should never exceed max_capacity after booking', () => {
    fc.assert(
      fc.property(
        workshopArb(),
        fc.integer({ min: 0, max: 50 }),
        (workshop, waitlistLength) => {
          const result = processBooking(workshop, waitlistLength);

          // Invariant: new_count never exceeds max_capacity
          expect(result.new_count).toBeLessThanOrEqual(workshop.max_capacity);
          expect(result.new_count).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('when workshop has space, booking increments count by exactly 1', () => {
    fc.assert(
      fc.property(
        workshopArb().filter((w) => w.current_count < w.max_capacity),
        fc.integer({ min: 0, max: 50 }),
        (workshop, waitlistLength) => {
          const result = processBooking(workshop, waitlistLength);

          expect(result.success).toBe(true);
          expect(result.waitlisted).toBe(false);
          expect(result.new_count).toBe(workshop.current_count + 1);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('when workshop is full, booking goes to waitlist without changing count', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }).chain((cap) =>
          fc.record({
            workshop: fc.constant<Workshop>({
              id: 'test-workshop',
              max_capacity: cap,
              current_count: cap,
              status: 'full',
            }),
            waitlistLength: fc.integer({ min: 0, max: 50 }),
          })
        ),
        ({ workshop, waitlistLength }) => {
          const result = processBooking(workshop, waitlistLength);

          expect(result.success).toBe(true);
          expect(result.waitlisted).toBe(true);
          expect(result.new_count).toBe(workshop.current_count);
          expect(result.waitlist_position).toBe(waitlistLength + 1);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('remaining spots equals max_capacity minus new_count', () => {
    fc.assert(
      fc.property(
        workshopArb().filter((w) => w.current_count < w.max_capacity),
        fc.integer({ min: 0, max: 50 }),
        (workshop, waitlistLength) => {
          const result = processBooking(workshop, waitlistLength);
          const remainingSpots = workshop.max_capacity - result.new_count;

          expect(remainingSpots).toBeGreaterThanOrEqual(0);
          expect(remainingSpots).toBe(
            workshop.max_capacity - (workshop.current_count + 1)
          );
        }
      ),
      { numRuns: 200 }
    );
  });

  it('status becomes full when count reaches max_capacity', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }).map(
          (cap): Workshop => ({
            id: 'test-workshop',
            max_capacity: cap,
            current_count: cap - 1,
            status: 'upcoming',
          })
        ),
        (workshop) => {
          const result = processBooking(workshop, 0);

          expect(result.new_count).toBe(workshop.max_capacity);
          expect(result.new_status).toBe('full');
        }
      ),
      { numRuns: 200 }
    );
  });
});
