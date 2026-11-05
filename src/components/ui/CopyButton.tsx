"use client";

import { useState } from "react";
import styles from "./CopyButton.module.css";

/** Small "Copy" button that confirms with "Copied" for 1.5 s. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the text is still visible and selectable.
    }
  };

  return (
    <button type="button" className={styles.button} onClick={copy} aria-label={`Copy ${label}`}>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
