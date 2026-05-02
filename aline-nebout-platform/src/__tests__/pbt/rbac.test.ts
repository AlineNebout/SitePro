/**
 * PBT: Role-based access control
 * **Validates: Requirements 15 (admin routes), middleware role checks**
 *
 * Property 15: admin routes only accessible by admin role.
 * Practitioner routes accessible by practitioner + admin.
 * Coaching routes accessible by coaching_user + admin.
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  canAccessRoute,
  getRouteAccessRules,
  type Role,
} from '@/lib/business-logic';

const ALL_ROLES: Role[] = ['coaching_user', 'practitioner', 'admin'];

const ADMIN_ROUTES = ['/admin', '/admin/ateliers', '/admin/blog'];
const PRACTITIONER_ROUTES = ['/mon-profil', '/communaute'];
const COACHING_ROUTES = ['/tableau-de-bord', '/exercices', '/progression'];
const PUBLIC_ROUTES = ['/', '/osteopathie', '/reflexes', '/coaching', '/contact'];

describe('Role-Based Access Control (Property 15)', () => {
  it('admin routes only accessible by admin role', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ADMIN_ROUTES),
        fc.constantFrom(...ALL_ROLES),
        (route, role) => {
          const allowed = canAccessRoute(role, route);

          if (role === 'admin') {
            expect(allowed).toBe(true);
          } else {
            expect(allowed).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('practitioner routes accessible by practitioner + admin', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PRACTITIONER_ROUTES),
        fc.constantFrom(...ALL_ROLES),
        (route, role) => {
          const allowed = canAccessRoute(role, route);

          if (role === 'practitioner' || role === 'admin') {
            expect(allowed).toBe(true);
          } else {
            expect(allowed).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('coaching routes accessible by coaching_user + admin', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...COACHING_ROUTES),
        fc.constantFrom(...ALL_ROLES),
        (route, role) => {
          const allowed = canAccessRoute(role, route);

          if (role === 'coaching_user' || role === 'admin') {
            expect(allowed).toBe(true);
          } else {
            expect(allowed).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('public routes accessible by all roles', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PUBLIC_ROUTES),
        fc.constantFrom(...ALL_ROLES),
        (route, role) => {
          expect(canAccessRoute(role, route)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('admin can access every defined route', () => {
    const rules = getRouteAccessRules();
    for (const rule of rules) {
      expect(canAccessRoute('admin', rule.path)).toBe(true);
    }
  });

  it('no role can access a route it is not allowed to', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_ROLES), (role) => {
        const rules = getRouteAccessRules();
        for (const rule of rules) {
          const allowed = canAccessRoute(role, rule.path);
          if (!rule.allowedRoles.includes(role)) {
            expect(allowed).toBe(false);
          }
        }
      }),
      { numRuns: 50 }
    );
  });
});
