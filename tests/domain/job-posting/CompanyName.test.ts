import { describe, expect, it } from "vitest";

import { CompanyName } from "../../../src/domain/job-posting/value-objects/CompanyName";

describe("CompanyName Value Object", () => {
  it("creates a company name", () => {
    const companyName = CompanyName.create("Acme Oy");

    expect(companyName).toBeInstanceOf(CompanyName);
  });

  it("returns its value", () => {
    const companyName = CompanyName.create("Acme Oy");

    expect(companyName.value).toBe("Acme Oy");
  });

  it("trims surrounding whitespace", () => {
    const companyName = CompanyName.create("  Acme Oy  ");

    expect(companyName.value).toBe("Acme Oy");
  });

  it("rejects an empty company name", () => {
    expect(() => CompanyName.create("")).toThrow();
  });

  it("rejects a whitespace-only company name", () => {
    expect(() => CompanyName.create("   ")).toThrow();
  });

  it("considers names with the same value equal", () => {
    const first = CompanyName.create("Acme Oy");
    const second = CompanyName.create("Acme Oy");

    expect(first.equals(second)).toBe(true);
  });

  it("considers names with different values different", () => {
    const first = CompanyName.create("Acme Oy");
    const second = CompanyName.create("Example Oy");

    expect(first.equals(second)).toBe(false);
  });
});
