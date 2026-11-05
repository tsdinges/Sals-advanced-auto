import type { ContactRequest } from "./contact-request";

/**
 * How a validated request leaves the browser. The form depends on this
 * interface only (Dependency Inversion), so moving from Netlify Forms to
 * an email API later means adding one implementation, not editing the form.
 */
export interface ContactSubmitter {
  submit(request: ContactRequest): Promise<void>;
}

/** Must match the name attribute in public/__forms.html */
export const NETLIFY_FORM_NAME = "appointment-request";

/**
 * Netlify Forms: Netlify detects the static form in public/__forms.html
 * at deploy time, then accepts URL-encoded posts to that file.
 * Submissions appear under Forms in the Netlify dashboard and can be
 * emailed to the shop from there.
 */
export const netlifyFormsSubmitter: ContactSubmitter = {
  async submit(request) {
    const body = new URLSearchParams({ "form-name": NETLIFY_FORM_NAME, ...request });
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) throw new Error(`Form service returned ${res.status}`);
  },
};
