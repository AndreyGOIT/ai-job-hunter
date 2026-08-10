import { describe, expect, it } from "vitest";

import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";

describe("WorkMode Value Object", () => {
  it("creates a remote work mode", () => {
    const workMode = WorkMode.create("REMOTE");

    expect(workMode.value).toBe("REMOTE");
  });

  it("creates a hybrid work mode", () => {
    const workMode = WorkMode.create("HYBRID");

    expect(workMode.value).toBe("HYBRID");
  });

  it("creates an onsite work mode", () => {
    const workMode = WorkMode.create("ONSITE");

    expect(workMode.value).toBe("ONSITE");
  });

  it("throws for an unsupported work mode", () => {
    expect(() => WorkMode.create("FLEXIBLE")).toThrow();
  });

  it("throws for an empty work mode", () => {
    expect(() => WorkMode.create("")).toThrow();
  });

  it("compares equal work modes by value", () => {
    const first = WorkMode.create("REMOTE");
    const second = WorkMode.create("REMOTE");

    expect(first.equals(second)).toBe(true);
  });

  it("does not consider different work modes equal", () => {
    const first = WorkMode.create("REMOTE");
    const second = WorkMode.create("HYBRID");

    expect(first.equals(second)).toBe(false);
  });
});