import { describe, expect, it } from "vitest";

import { JobPostingStatus } from "../../../src/domain/job-posting/value-objects/JobPostingStatus";

describe("JobPostingStatus Value Object", () => {
  it("creates an OPEN status", () => {
    const status = JobPostingStatus.create("OPEN");

    expect(status.value).toBe("OPEN");
  });

  it("creates a CLOSED status", () => {
    const status = JobPostingStatus.create("CLOSED");

    expect(status.value).toBe("CLOSED");
  });

  it("rejects an unsupported status", () => {
    expect(() =>
      JobPostingStatus.create("INVALID" as never),
    ).toThrow();
  });

  it("considers statuses with the same value equal", () => {
    const first = JobPostingStatus.create("OPEN");
    const second = JobPostingStatus.create("OPEN");

    expect(first.equals(second)).toBe(true);
  });

  it("considers statuses with different values different", () => {
    const open = JobPostingStatus.create("OPEN");
    const closed = JobPostingStatus.create("CLOSED");

    expect(open.equals(closed)).toBe(false);
  });
});