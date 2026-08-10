import { describe, expect, it } from "vitest";

import { JobTitle } from "../../../src/domain/job-posting/value-objects/JobTitle";

describe("JobTitle Value Object", () => {
  it("creates a job title", () => {
    const title = JobTitle.create("Full Stack Developer");

    expect(title).toBeInstanceOf(JobTitle);
  });

  it("returns its value", () => {
    const title = JobTitle.create("Full Stack Developer");

    expect(title.value).toBe("Full Stack Developer");
  });

  it("trims surrounding whitespace", () => {
    const title = JobTitle.create("  Full Stack Developer  ");

    expect(title.value).toBe("Full Stack Developer");
  });

  it("rejects an empty title", () => {
    expect(() => JobTitle.create("")).toThrow();
  });

  it("rejects a whitespace-only title", () => {
    expect(() => JobTitle.create("   ")).toThrow();
  });

  it("considers titles with the same value equal", () => {
    const first = JobTitle.create("Full Stack Developer");
    const second = JobTitle.create("Full Stack Developer");

    expect(first.equals(second)).toBe(true);
  });

  it("considers titles with different values different", () => {
    const first = JobTitle.create("Full Stack Developer");
    const second = JobTitle.create("Backend Developer");

    expect(first.equals(second)).toBe(false);
  });
});