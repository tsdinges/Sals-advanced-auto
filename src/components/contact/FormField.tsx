import type { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  /** The control; it should use the same id and aria-describedby={`${id}-error`} */
  children: ReactNode;
}

/** Label + control + inline error, wired together for screen readers. */
export function FormField({ id, label, optional, error, children }: FormFieldProps) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional ? <span className={styles.optional}> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
