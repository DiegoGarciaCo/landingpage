/**
 * Utility functions for the application
 */

/**
 * Format phone number for display
 * @param phoneNumber - Raw phone number string
 * @returns Formatted phone number (e.g., "(555) 123-4567")
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Format as +X (XXX) XXX-XXXX for 11 digits (with country code)
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Return as-is if it doesn't match expected lengths
  return phoneNumber;
}

/**
 * Combine class names conditionally
 * @param classes - Array of class names or conditional objects
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

