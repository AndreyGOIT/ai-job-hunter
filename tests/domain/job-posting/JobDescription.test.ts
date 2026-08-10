import { describe, expect, it } from "vitest";

import { JobDescription } from "../../../src/domain/job-posting/value-objects/JobDescription";

describe("JobDescription Value Object", () => {
  it("creates a job description", () => {
    const description = JobDescription.create(
      "We are looking for a Full Stack Developer."
    );

    expect(description).toBeInstanceOf(JobDescription);
  });

  it("returns its value", () => {
    const description = JobDescription.create(
      "We are looking for a Full Stack Developer."
    );

    expect(description.value).toBe(
      "We are looking for a Full Stack Developer."
    );
  });

  it("trims surrounding whitespace", () => {
    const description = JobDescription.create(
      "  We are looking for a Full Stack Developer.  "
    );

    expect(description.value).toBe(
      "We are looking for a Full Stack Developer."
    );
  });

  it("preserves internal whitespace", () => {
    const description = JobDescription.create(
      "We are looking for a Full Stack Developer.\n\nRemote work is possible."
    );

    expect(description.value).toBe(
      "We are looking for a Full Stack Developer.\n\nRemote work is possible."
    );
  });

  it("rejects an empty description", () => {
    expect(() => JobDescription.create("")).toThrow();
  });

  it("rejects a whitespace-only description", () => {
    expect(() => JobDescription.create("   \n  ")).toThrow();
  });

  it("considers descriptions with the same value equal", () => {
    const first = JobDescription.create("Full Stack Developer");
    const second = JobDescription.create("Full Stack Developer");

    expect(first.equals(second)).toBe(true);
  });

  it("considers descriptions with different values different", () => {
    const first = JobDescription.create("Full Stack Developer");
    const second = JobDescription.create("Backend Developer");

    expect(first.equals(second)).toBe(false);
  });
});
