"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  emptyContactRequest,
  normalizeContactRequest,
  validateContactRequest,
  type ContactErrors,
  type ContactField,
  type ContactRequest,
} from "@/lib/contact/contact-request";
import type { ContactSubmitter } from "@/lib/contact/submitters";

export type SubmitState = "idle" | "sending" | "sent" | "failed";

/**
 * Form state machine: values, per-field errors, and submit status.
 * The submitter is injected, so the hook never knows where requests go.
 */
export function useContactForm(submitter: ContactSubmitter, initial?: Partial<ContactRequest>) {
  const [values, setValues] = useState<ContactRequest>({ ...emptyContactRequest, ...initial });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
  /** Spam trap: hidden from people, bots fill it in. */
  const [honeypot, setHoneypot] = useState("");

  const onChange =
    (field: ContactField) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      // Clear a field's error as soon as the visitor edits it.
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContactRequest(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    if (honeypot) {
      setState("sent"); // silently drop bot submissions
      return;
    }

    setState("sending");
    try {
      await submitter.submit(normalizeContactRequest(values));
      setState("sent");
      setValues({ ...emptyContactRequest, ...initial });
    } catch {
      setState("failed");
    }
  };

  return { values, errors, state, onChange, onSubmit, honeypot, setHoneypot };
}
