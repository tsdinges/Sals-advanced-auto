import { describe, expect, it } from "vitest";
import {
  emptyContactRequest,
  isValidPhone,
  normalizeContactRequest,
  validateContactRequest,
} from "./contact-request";

const valid = { ...emptyContactRequest, name: "Pat", phone: "(603) 555-0123" };

describe("validateContactRequest", () => {
  it("accepts name + phone only", () => {
    expect(validateContactRequest(valid)).toEqual({});
  });

  it("requires name and phone", () => {
    const e = validateContactRequest(emptyContactRequest);
    expect(Object.keys(e).sort()).toEqual(["name", "phone"]);
  });

  it("rejects a short phone and a malformed email", () => {
    const e = validateContactRequest({ ...valid, phone: "555-0123", email: "pat@" });
    expect(e.phone).toMatch(/10-digit/);
    expect(e.email).toMatch(/email/);
  });
});

describe("isValidPhone", () => {
  it.each(["6035550123", "603-555-0123", "+1 (603) 555-0123"])("accepts %s", (p) => {
    expect(isValidPhone(p)).toBe(true);
  });
  it("rejects 7 digits", () => expect(isValidPhone("5550123")).toBe(false));
});

describe("normalizeContactRequest", () => {
  it("trims whitespace", () => {
    expect(normalizeContactRequest({ ...valid, name: "  Pat  " }).name).toBe("Pat");
  });
});
