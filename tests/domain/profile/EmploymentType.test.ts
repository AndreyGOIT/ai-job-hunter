import { describe, expect, it } from "vitest";

import { EmploymentType } from "../../../src/domain/profile/value-objects/EmploymentType";

describe("EmploymentType Value Object", () => {
  it("creates a full-time employment type", () => {
    const employmentType = EmploymentType.create("FULL_TIME");

    expect(employmentType.value).toBe("FULL_TIME");
  });

  it("creates a part-time employment type", () => {
    const employmentType = EmploymentType.create("PART_TIME");

    expect(employmentType.value).toBe("PART_TIME");
  });

  it("creates a contract employment type", () => {
    const employmentType = EmploymentType.create("CONTRACT");

    expect(employmentType.value).toBe("CONTRACT");
  });

  it("throws for an unsupported employment type", () => {
    expect(() => EmploymentType.create("TEMPORARY")).toThrow();
  });

  it("throws for an empty employment type", () => {
    expect(() => EmploymentType.create("")).toThrow();
  });

  it("compares equal employment types by value", () => {
    const first = EmploymentType.create("FULL_TIME");
    const second = EmploymentType.create("FULL_TIME");

    expect(first.equals(second)).toBe(true);
  });

  it("does not consider different employment types equal", () => {
    const first = EmploymentType.create("FULL_TIME");
    const second = EmploymentType.create("PART_TIME");

    expect(first.equals(second)).toBe(false);
  });
});