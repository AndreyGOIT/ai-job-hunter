import { describe, expect, it } from "vitest";
import { Email } from "./value-objects/Email";

describe("Email Value Object", () => {
  it("creates a valid email", () => {
    const email = Email.create("andy@example.com");

    expect(email.value).toBe("andy@example.com");
  });

  it("normalizes email to lowercase", () => {
    const email = Email.create("Andy@Example.COM");

    expect(email.value).toBe("andy@example.com");
  });

  it("throws for an empty email", () => {
    expect(() => Email.create("")).toThrow("Email cannot be empty.");
  });

  it("throws for an invalid email format", () => {
    expect(() => Email.create("not-an-email")).toThrow(
      "Invalid email format.",
    );
  });

  it("compares equal email addresses", () => {
    const first = Email.create("andy@example.com");
    const second = Email.create("Andy@Example.com");

    expect(first.equals(second)).toBe(true);
  });
});