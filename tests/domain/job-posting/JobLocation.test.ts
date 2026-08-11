import { describe, expect, it } from "vitest";

import { JobLocation } from "../../../src/domain/job-posting/value-objects/JobLocation";

describe("JobLocation Value Object", () => {
  it("creates a valid job location", () => {
    const location = JobLocation.create("Helsinki");

    expect(location.value).toBe("Helsinki");
  });

  it("trims surrounding whitespace", () => {
    const location = JobLocation.create("  Helsinki  ");

    expect(location.value).toBe("Helsinki");
  });

  it("rejects an empty location", () => {
    expect(() => JobLocation.create("")).toThrow(
      "Job location cannot be empty",
    );
  });

  it("rejects a whitespace-only location", () => {
    expect(() => JobLocation.create("   ")).toThrow(
      "Job location cannot be empty",
    );
  });

  it("rejects a location that is too long", () => {
    const longLocation = "A".repeat(201);

    expect(() => JobLocation.create(longLocation)).toThrow(
      "Job location cannot exceed 200 characters",
    );
  });

  it("considers locations with the same value equal", () => {
    const first = JobLocation.create("Helsinki");
    const second = JobLocation.create("Helsinki");

    expect(first.equals(second)).toBe(true);
  });

  it("considers locations with different values different", () => {
    const first = JobLocation.create("Helsinki");
    const second = JobLocation.create("Espoo");

    expect(first.equals(second)).toBe(false);
  });
});