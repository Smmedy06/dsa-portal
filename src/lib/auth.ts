// Authentication utilities

/**
 * Validates PUCIT email format
 * Format: ^[a-z]{4}\d{2}[a-z]\d{3}@pucit\.edu\.pk$
 * Example: bcsf23m023@pucit.edu.pk
 */
export function isValidPucitEmail(email: string): boolean {
  const regex = /^[a-z]{4}\d{2}[a-z]\d{3}@pucit\.edu\.pk$/;
  return regex.test(email.toLowerCase());
}

/**
 * Extracts roll number from PUCIT email
 * Example: bcsf23m023@pucit.edu.pk -> bcsf23m023
 */
export function extractRollNumber(email: string): string | null {
  if (!isValidPucitEmail(email)) {
    return null;
  }
  return email.toLowerCase().split('@')[0];
}

/**
 * Checks if email is enrolled
 */
export async function isEmailEnrolled(email: string): Promise<boolean> {
  const { supabase } = await import('@/integrations/supabase/client');
  
  const { data, error } = await supabase
    .from('enrolled_students')
    .select('email')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return false;
  }
  return true;
}

/**
 * Checks if user is an admin
 */
export async function isUserAdmin(email: string): Promise<boolean> {
  const { supabase } = await import('@/integrations/supabase/client');
  
  // Check in users table
  const { data: userData } = await supabase
    .from('users')
    .select('is_admin')
    .eq('email', email.toLowerCase())
    .single();

  if (userData?.is_admin) {
    return true;
  }

  // Check in admins table
  const { data: adminData } = await supabase
    .from('admins')
    .select('is_active')
    .eq('email', email.toLowerCase())
    .eq('is_active', true)
    .single();

  return !!adminData;
}

/**
 * Validates user can access the portal
 * 1. Email must be valid PUCIT format
 * 2. User must be either:
 *    - An admin (in users table with is_admin=true OR in admins table with is_active=true)
 *    - OR enrolled in enrolled_students table
 */
export async function validateUserAccess(email: string): Promise<{
  valid: boolean;
  error?: string;
}> {
  // Check email format
  if (!isValidPucitEmail(email)) {
    return {
      valid: false,
      error: 'Invalid PUCIT email format. Must be: rollnumber@pucit.edu.pk',
    };
  }

  // Check if user is an admin first
  const isAdmin = await isUserAdmin(email);
  if (isAdmin) {
    return { valid: true };
  }

  // If not admin, check if enrolled
  const enrolled = await isEmailEnrolled(email);
  if (!enrolled) {
    return {
      valid: false,
      error: 'You are not enrolled in this course. Please contact the TA.',
    };
  }

  return { valid: true };
}
