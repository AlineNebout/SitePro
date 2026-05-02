/**
 * PBT: RLS data isolation
 * **Validates: Requirements 18.2**
 *
 * Property 12: users can only access their own data.
 * Exercise completions and program assignments are scoped to user_id.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  filterByUserId,
  canUserAccessRecord,
  type UserScopedRecord,
} from '@/lib/business-logic';

function userScopedRecordArb(): fc.Arbitrary<UserScopedRecord> {
  return fc.record({
    id: fc.uuid(),
    user_id: fc.uuid(),
  });
}

describe('RLS Data Isolation (Property 12)', () => {
  it('filterByUserId returns only records belonging to the user', () => {
    fc.assert(
      fc.property(
        fc.array(userScopedRecordArb(), { minLength: 0, maxLength: 50 }),
        fc.uuid(),
        (records, userId) => {
          const result = filterByUserId(records, userId);

          // All returned records belong to the user
          for (const record of result) {
            expect(record.user_id).toBe(userId);
          }
        }
      ),
      { numRuns: 300 }
    );
  });

  it('filterByUserId excludes records belonging to other users', () => {
    fc.assert(
      fc.property(
        fc.array(userScopedRecordArb(), { minLength: 0, maxLength: 50 }),
        fc.uuid(),
        (records, userId) => {
          const result = filterByUserId(records, userId);
          const excluded = records.filter((r) => r.user_id !== userId);

          // No excluded record should appear in the result
          for (const record of excluded) {
            expect(result).not.toContainEqual(record);
          }
        }
      ),
      { numRuns: 300 }
    );
  });

  it('filterByUserId preserves all matching records (no data loss)', () => {
    fc.assert(
      fc.property(
        fc.array(userScopedRecordArb(), { minLength: 0, maxLength: 50 }),
        fc.uuid(),
        (records, userId) => {
          const result = filterByUserId(records, userId);
          const expected = records.filter((r) => r.user_id === userId);

          expect(result.length).toBe(expected.length);
        }
      ),
      { numRuns: 300 }
    );
  });

  it('canUserAccessRecord returns true only for own records', () => {
    fc.assert(
      fc.property(
        userScopedRecordArb(),
        fc.uuid(),
        (record, requestingUserId) => {
          const canAccess = canUserAccessRecord(record, requestingUserId);

          if (record.user_id === requestingUserId) {
            expect(canAccess).toBe(true);
          } else {
            expect(canAccess).toBe(false);
          }
        }
      ),
      { numRuns: 300 }
    );
  });

  it('user always has access to their own records', () => {
    fc.assert(
      fc.property(fc.uuid(), fc.uuid(), (recordId, userId) => {
        const record: UserScopedRecord = { id: recordId, user_id: userId };
        expect(canUserAccessRecord(record, userId)).toBe(true);
      }),
      { numRuns: 200 }
    );
  });

  it('different users cannot access each others records', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.uuid(),
        fc.uuid(),
        (recordId, ownerId, otherUserId) => {
          fc.pre(ownerId !== otherUserId);

          const record: UserScopedRecord = { id: recordId, user_id: ownerId };
          expect(canUserAccessRecord(record, otherUserId)).toBe(false);
        }
      ),
      { numRuns: 300 }
    );
  });
});
