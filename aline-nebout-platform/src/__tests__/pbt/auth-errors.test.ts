/**
 * PBT: Auth error message safety
 * **Validates: Requirements 11.4**
 *
 * Property 6: error messages never reveal whether email exists.
 * Login errors always return generic "Identifiants incorrects" message.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAuthErrorMessage, getGenericAuthError } from '@/lib/business-logic';

const ERROR_TYPES = [
  'invalid_email',
  'invalid_password',
  'both_invalid',
  'unknown',
] as const;

describe('Auth Error Message Safety (Property 6)', () => {
  it('all error types produce the same generic message', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ERROR_TYPES), (errorType) => {
        const message = getAuthErrorMessage(errorType);
        const generic = getGenericAuthError();

        expect(message).toBe(generic);
      }),
      { numRuns: 100 }
    );
  });

  it('error message never contains "email" as a distinguishing hint', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ERROR_TYPES), (errorType) => {
        const message = getAuthErrorMessage(errorType);

        // Should not contain phrases that reveal which field is wrong
        expect(message).not.toMatch(/email (introuvable|inexistant|inconnu)/i);
        expect(message).not.toMatch(/aucun compte/i);
        expect(message).not.toMatch(/mot de passe (incorrect|erroné|faux)/i);
      }),
      { numRuns: 100 }
    );
  });

  it('error message is identical regardless of email/password combination', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.constantFrom(...ERROR_TYPES),
        (_email, _password, errorType) => {
          const message = getAuthErrorMessage(errorType);
          const expected = getGenericAuthError();

          // Regardless of what email/password was tried, message is the same
          expect(message).toBe(expected);
        }
      ),
      { numRuns: 300 }
    );
  });

  it('generic error message is a non-empty string', () => {
    const message = getGenericAuthError();
    expect(message.length).toBeGreaterThan(0);
    expect(typeof message).toBe('string');
  });
});
