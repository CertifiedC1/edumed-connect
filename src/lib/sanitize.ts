import DOMPurify from "dompurify";

/** Sanitize string input - strips HTML tags and trims */
export function sanitizeInput(value: string): string {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }).trim();
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate phone number (Kenya format) */
export function isValidPhone(phone: string): boolean {
  return /^(\+?254|0)\d{9}$/.test(phone.replace(/[\s-]/g, ""));
}

/** Limit string length */
export function truncateInput(value: string, maxLength: number): string {
  return value.slice(0, maxLength);
}
