import { describe, expect, it } from "vitest";

import { JobPostingId } from "../../../src/domain/job-posting/value-objects/JobPostingId";

describe("JobPostingId Value Object", () => {
  it("creates a JobPostingId", () => {
    const id = JobPostingId.create();

    expect(id).toBeInstanceOf(JobPostingId);
  });

  it("generates unique ids", () => {
    const first = JobPostingId.create();
    const second = JobPostingId.create();

    expect(first.equals(second)).toBe(false);
  });

  it("creates an id from an existing value", () => {
    const value = "job-posting-123";
    const id = JobPostingId.create(value);

    expect(id.value).toBe(value);
  });

  it("considers ids with the same value equal", () => {
    const first = JobPostingId.create("job-posting-123");
    const second = JobPostingId.create("job-posting-123");

    expect(first.equals(second)).toBe(true);
  });

  it("considers ids with different values different", () => {
    const first = JobPostingId.create("job-posting-123");
    const second = JobPostingId.create("job-posting-456");

    expect(first.equals(second)).toBe(false);
  });
});