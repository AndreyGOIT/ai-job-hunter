import { describe, expect, it } from "vitest";

import { EmploymentType } from "../../../src/domain/job-posting/value-objects/EmploymentType";

describe("EmploymentType Value Object", () => {
  it("creates a full-time employment type", () => {
    const employmentType = EmploymentType.create("full-time");

    expect(employmentType.value).toBe("full-time");
  });

  it("creates a part-time employment type", () => {
    const employmentType = EmploymentType.create("part-time");

    expect(employmentType.value).toBe("part-time");
  });

  it("creates a contract employment type", () => {
    const employmentType = EmploymentType.create("contract");

    expect(employmentType.value).toBe("contract");
  });

  it("creates a temporary employment type", () => {
    const employmentType = EmploymentType.create("temporary");

    expect(employmentType.value).toBe("temporary");
  });

  it("creates an internship employment type", () => {
    const employmentType = EmploymentType.create("internship");

    expect(employmentType.value).toBe("internship");
  });

  it("rejects an unsupported employment type", () => {
    expect(() =>
      EmploymentType.create("freelance"),
    ).toThrow("Invalid employment type");
  });

  it("considers employment types with the same value equal", () => {
    const first = EmploymentType.create("full-time");
    const second = EmploymentType.create("full-time");

    expect(first.equals(second)).toBe(true);
  });

  it("considers employment types with different values different", () => {
    const fullTime = EmploymentType.create("full-time");
    const partTime = EmploymentType.create("part-time");

    expect(fullTime.equals(partTime)).toBe(false);
  });
});