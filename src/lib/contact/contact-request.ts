/**
 * Appointment request: shape, field names and validation.
 * Pure TypeScript, shared by the form UI and any future server handler.
 */

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  message: string;
}

export type ContactField = keyof ContactRequest;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContactRequest: ContactRequest = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  service: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** US phone: 10 digits, or 11 starting with 1. Formatting characters are ignored. */
export function isValidPhone(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

/** Returns an error message per invalid field; empty object means valid. */
export function validateContactRequest(r: ContactRequest): ContactErrors {
  const errors: ContactErrors = {};
  if (!r.name.trim()) errors.name = "Enter your name so we know who to ask for.";
  if (!r.phone.trim()) errors.phone = "Enter a phone number so we can call you back.";
  else if (!isValidPhone(r.phone)) errors.phone = "Enter a 10-digit phone number, like 603-555-0123.";
  if (r.email.trim() && !EMAIL.test(r.email.trim())) errors.email = "Check the email address, or leave it blank.";
  if (r.message.length > 2000) errors.message = "Keep the message under 2,000 characters.";
  return errors;
}

/** Trims every field before sending. */
export function normalizeContactRequest(r: ContactRequest): ContactRequest {
  return Object.fromEntries(
    Object.entries(r).map(([k, v]) => [k, v.trim()]),
  ) as unknown as ContactRequest;
}
