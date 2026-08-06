import { describe, expect, it } from "vitest";
import { UserId } from "../../../src/domain/user/value-objects/UserId";

describe("UserId Value Object", () => {
  it("creates a new UUID v4", () => {
    const userId = UserId.create();

    expect(userId.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("restores an existing UUID", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";

    const userId = UserId.from(uuid);

    expect(userId.value).toBe(uuid);
  });

  it("throws for an invalid UUID", () => {
    expect(() => UserId.from("not-a-uuid")).toThrow(
      "Invalid UserId format.",
    );
  });

  it("compares equal identifiers", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";

    const first = UserId.from(uuid);
    const second = UserId.from(uuid);

    expect(first.equals(second)).toBe(true);
  });

  it("compares different identifiers", () => {
    const first = UserId.create();
    const second = UserId.create();

    expect(first.equals(second)).toBe(false);
  });
});