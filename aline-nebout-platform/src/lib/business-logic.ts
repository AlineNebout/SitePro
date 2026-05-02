/**
 * Pure business logic functions extracted for testability.
 * These functions contain no Supabase or framework dependencies.
 */

// --- Workshop Booking (Property 7 & 8) ---

export interface Workshop {
  id: string;
  max_capacity: number;
  current_count: number;
  status: 'upcoming' | 'full' | 'completed' | 'cancelled';
}

export interface BookingResult {
  success: boolean;
  waitlisted: boolean;
  new_count: number;
  new_status: Workshop['status'];
  waitlist_position?: number;
}

/**
 * Determines the result of attempting to book a workshop.
 * Property 7: current_count should never exceed max_capacity.
 */
export function processBooking(
  workshop: Workshop,
  waitlistLength: number
): BookingResult {
  if (workshop.status === 'cancelled' || workshop.status === 'completed') {
    return {
      success: false,
      waitlisted: false,
      new_count: workshop.current_count,
      new_status: workshop.status,
    };
  }

  if (workshop.current_count >= workshop.max_capacity) {
    return {
      success: true,
      waitlisted: true,
      new_count: workshop.current_count,
      new_status: 'full',
      waitlist_position: waitlistLength + 1,
    };
  }

  const newCount = workshop.current_count + 1;
  const newStatus: Workshop['status'] =
    newCount >= workshop.max_capacity ? 'full' : 'upcoming';

  return {
    success: true,
    waitlisted: false,
    new_count: newCount,
    new_status: newStatus,
  };
}

export interface CancellationResult {
  new_count: number;
  new_status: Workshop['status'];
  promoted_email: string | null;
}

export interface WaitlistEntry {
  email: string;
  name: string;
  position: number;
}

/**
 * Determines the result of cancelling a booking.
 * Property 8: cancellation decrements count, promotes first waitlisted person.
 */
export function processCancellation(
  workshop: Workshop,
  waitlist: WaitlistEntry[]
): CancellationResult {
  const decrementedCount = Math.max(0, workshop.current_count - 1);

  if (waitlist.length === 0) {
    return {
      new_count: decrementedCount,
      new_status: decrementedCount < workshop.max_capacity ? 'upcoming' : workshop.status,
      promoted_email: null,
    };
  }

  // Sort by position to get first in line
  const sorted = [...waitlist].sort((a, b) => a.position - b.position);
  const promoted = sorted[0];

  // After promotion, count goes back up by 1
  const countAfterPromotion = decrementedCount + 1;
  const newStatus: Workshop['status'] =
    countAfterPromotion >= workshop.max_capacity ? 'full' : 'upcoming';

  return {
    new_count: countAfterPromotion,
    new_status: newStatus,
    promoted_email: promoted.email,
  };
}

// --- Exercise Completion (Property 9) ---

/**
 * Calculates exercise completion percentage.
 * Property 9: percentage = Math.round((completed / total) * 100), always 0-100.
 */
export function calculateCompletionPercentage(
  totalExercises: number,
  completedExercises: number
): number {
  if (totalExercises <= 0) return 0;
  const clamped = Math.min(Math.max(completedExercises, 0), totalExercises);
  return Math.round((clamped / totalExercises) * 100);
}

// --- Self-Assessment Threshold (Property 4) ---

/**
 * Determines if the recommendation should be shown based on checked items.
 * Property 4: recommendation shown iff checked count >= threshold.
 */
export function shouldShowRecommendation(
  checkedItems: boolean[],
  threshold: number = 3
): boolean {
  const count = checkedItems.filter(Boolean).length;
  return count >= threshold;
}

// --- Filter/Sort (Property 3) ---

export interface Article {
  slug: string;
  name: string;
  spheres: string[];
  sort_order: number;
}

/**
 * Filters articles by sphere and maintains sort order.
 * Property 3: filtering preserves all matching items, excludes non-matching,
 * and maintains sort_order.
 */
export function filterArticlesBySphere(
  articles: Article[],
  sphere: string | null
): Article[] {
  const filtered =
    sphere === null || sphere === 'all'
      ? articles
      : articles.filter((a) => a.spheres.includes(sphere));

  return [...filtered].sort((a, b) => a.sort_order - b.sort_order);
}

// --- RBAC (Property 15) ---

export type Role = 'coaching_user' | 'practitioner' | 'admin';

export interface RouteAccess {
  path: string;
  allowedRoles: Role[];
}

const ROUTE_ACCESS_RULES: RouteAccess[] = [
  { path: '/admin', allowedRoles: ['admin'] },
  { path: '/tableau-de-bord', allowedRoles: ['coaching_user', 'admin'] },
  { path: '/exercices', allowedRoles: ['coaching_user', 'admin'] },
  { path: '/progression', allowedRoles: ['coaching_user', 'admin'] },
  { path: '/mon-profil', allowedRoles: ['practitioner', 'admin'] },
  { path: '/communaute', allowedRoles: ['practitioner', 'admin'] },
];

/**
 * Checks if a role can access a given route.
 * Property 15: admin routes only accessible by admin, practitioner routes
 * by practitioner + admin, coaching routes by coaching_user + admin.
 */
export function canAccessRoute(role: Role, path: string): boolean {
  const rule = ROUTE_ACCESS_RULES.find((r) => path.startsWith(r.path));
  if (!rule) return true; // Public routes are accessible to all
  return rule.allowedRoles.includes(role);
}

export function getRouteAccessRules(): RouteAccess[] {
  return ROUTE_ACCESS_RULES;
}

// --- Auth Error Safety (Property 6) ---

const GENERIC_AUTH_ERROR = 'Identifiants incorrects. Vérifiez votre email et mot de passe.';

/**
 * Returns a safe, generic auth error message.
 * Property 6: error messages never reveal whether email exists.
 */
export function getAuthErrorMessage(
  _errorType: 'invalid_email' | 'invalid_password' | 'both_invalid' | 'unknown'
): string {
  return GENERIC_AUTH_ERROR;
}

export function getGenericAuthError(): string {
  return GENERIC_AUTH_ERROR;
}

// --- RLS Data Isolation (Property 12) ---

export interface UserScopedRecord {
  id: string;
  user_id: string;
}

/**
 * Filters records to only those belonging to the given user.
 * Property 12: users can only access their own data.
 */
export function filterByUserId<T extends UserScopedRecord>(
  records: T[],
  userId: string
): T[] {
  return records.filter((r) => r.user_id === userId);
}

/**
 * Checks if a user can access a specific record.
 */
export function canUserAccessRecord(
  record: UserScopedRecord,
  userId: string
): boolean {
  return record.user_id === userId;
}
