import { describe, expect, it } from "vitest";

import { JobPostingSource } from "../../../src/domain/job-posting/value-objects/JobPostingSource";

describe("JobPostingSource Value Object", () => {
  it("creates a job posting source from a valid URL", () => {
    const source = JobPostingSource.create("https://www.linkedin.com/jobs/view/123");

    expect(source).toBeInstanceOf(JobPostingSource);
  });

  it("returns its value", () => {
    const source = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/123"
    );

    expect(source.value).toBe("https://www.linkedin.com/jobs/view/123");
  });

  it("trims surrounding whitespace", () => {
    const source = JobPostingSource.create(
      "  https://www.linkedin.com/jobs/view/123  "
    );

    expect(source.value).toBe("https://www.linkedin.com/jobs/view/123");
  });

  it("rejects an empty URL", () => {
    expect(() => JobPostingSource.create("")).toThrow();
  });

  it("rejects a whitespace-only URL", () => {
    expect(() => JobPostingSource.create("   ")).toThrow();
  });

  it("rejects an invalid URL", () => {
    expect(() => JobPostingSource.create("not-a-valid-url")).toThrow();
  });

  it("accepts URLs from different job sources", () => {
    const linkedin = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/123"
    );

    const duunitori = JobPostingSource.create(
      "https://duunitori.fi/tyopaikat/123"
    );

    expect(linkedin).toBeInstanceOf(JobPostingSource);
    expect(duunitori).toBeInstanceOf(JobPostingSource);
  });

  it("considers sources with the same URL equal", () => {
    const first = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/123"
    );

    const second = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/123"
    );

    expect(first.equals(second)).toBe(true);
  });

  it("considers sources with different URLs different", () => {
    const first = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/123"
    );

    const second = JobPostingSource.create(
      "https://www.linkedin.com/jobs/view/456"
    );

    expect(first.equals(second)).toBe(false);
  });
});