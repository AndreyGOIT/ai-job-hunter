import { describe, expect, it } from "vitest";

import { DesiredPosition } from "../../../src/domain/profile/value-objects/DesiredPosition";

describe("DesiredPosition Value Object", () => {
  it("creates a desired position", () => {
    const position = DesiredPosition.create("Full Stack Developer");

    expect(position).toBeInstanceOf(DesiredPosition);
  });

  it("trims leading and trailing whitespace", () => {
    const position = DesiredPosition.create("  Full Stack Developer  ");

    expect(position.value).toBe("Full Stack Developer");
  });

  it("rejects an empty position", () => {
    expect(() => DesiredPosition.create("")).toThrow();
  });

  it("rejects a whitespace-only position", () => {
    expect(() => DesiredPosition.create("   ")).toThrow();
  });

  it("compares positions by value", () => {
    const first = DesiredPosition.create("Full Stack Developer");
    const second = DesiredPosition.create("Full Stack Developer");

    expect(first.equals(second)).toBe(true);
  });

  it("considers different positions different", () => {
    const first = DesiredPosition.create("Full Stack Developer");
    const second = DesiredPosition.create("Backend Developer");

    expect(first.equals(second)).toBe(false);
  });
});