"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { netlifyFormsSubmitter, type ContactSubmitter } from "@/lib/contact/submitters";
import type { ContactField } from "@/lib/contact/contact-request";
import { Button } from "@/components/ui/Button";
import { FormField } from "./FormField";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  /** Options for the "Service" dropdown */
  serviceOptions: readonly string[];
  /** Shown if sending fails, so the visitor can still reach the shop */
  fallbackPhone: string;
  /** Defaults to Netlify Forms; swap for tests or another provider */
  submitter?: ContactSubmitter;
}

export function ContactForm({ serviceOptions, fallbackPhone, submitter = netlifyFormsSubmitter }: ContactFormProps) {
  const { values, errors, state, onChange, onSubmit, honeypot, setHoneypot } = useContactForm(submitter);

  /** Shared props for each control: value, change handler, error wiring. */
  const bind = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: onChange(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  if (state === "sent") {
    return (
      <div className={styles.panel} role="status">
        <h3 className={styles.title}>Request received</h3>
        <p>Thanks. We&apos;ll call you back during shop hours to set up a time.</p>
        <p className={styles.muted}>Need us sooner? Call {fallbackPhone}.</p>
      </div>
    );
  }

  return (
    <form className={styles.panel} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className={styles.title}>
        Request an appointment
      </h3>

      <div className={styles.row}>
        <FormField id="contact-name" label="Name" error={errors.name}>
          <input {...bind("name")} autoComplete="name" required />
        </FormField>
        <FormField id="contact-phone" label="Phone" error={errors.phone}>
          <input {...bind("phone")} type="tel" inputMode="tel" autoComplete="tel" required />
        </FormField>
      </div>

      <FormField id="contact-email" label="Email" optional error={errors.email}>
        <input {...bind("email")} type="email" inputMode="email" autoComplete="email" />
      </FormField>

      <div className={styles.row}>
        <FormField id="contact-vehicle" label="Vehicle" optional>
          <input {...bind("vehicle")} placeholder="Year, make, model" />
        </FormField>
        <FormField id="contact-service" label="Service" optional>
          <select {...bind("service")}>
            <option value="">Choose one</option>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
            <option>Something else</option>
          </select>
        </FormField>
      </div>

      <FormField id="contact-message" label="What's going on?" optional error={errors.message}>
        <textarea {...bind("message")} placeholder="Noises, warning lights, when it started" />
      </FormField>

      {/* Honeypot: hidden from people and screen readers */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send request"}
        </Button>
        {state === "failed" ? (
          <p className={styles.failed} role="alert">
            Your request didn&apos;t send. Check your connection and try again, or call {fallbackPhone}.
          </p>
        ) : (
          <p className={styles.muted}>We&apos;ll call you back to confirm a time.</p>
        )}
      </div>
    </form>
  );
}
