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

  it("rejects an unsupported employment type", () => {
    expect(() =>
      EmploymentType.create("TEMPORARY"),
    ).toThrow("Unsupported employment type: TEMPORARY");
  });

  it("considers employment types with the same value equal", () => {
    const first = EmploymentType.create("FULL_TIME");
    const second = EmploymentType.create("FULL_TIME");

    expect(first.equals(second)).toBe(true);
  });

  it("considers employment types with different values different", () => {
    const fullTime = EmploymentType.create("FULL_TIME");
    const partTime = EmploymentType.create("PART_TIME");

    expect(fullTime.equals(partTime)).toBe(false);
  });
});
