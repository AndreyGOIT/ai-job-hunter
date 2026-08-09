import { describe, expect, it } from "vitest";

import { ProfileId } from "../../../src/domain/profile/value-objects/ProfileId";

describe("ProfileId Value Object", () => {
  it("creates a profile id", () => {
    const id = ProfileId.create();

    expect(id).toBeInstanceOf(ProfileId);
  });

  it("generates a unique id for each profile", () => {
    const first = ProfileId.create();
    const second = ProfileId.create();

    expect(first.equals(second)).toBe(false);
  });

  it("returns the id value", () => {
    const id = ProfileId.create();

    expect(id.value).toBeDefined();
    expect(typeof id.value).toBe("string");
    expect(id.value.length).toBeGreaterThan(0);
  });

  it("creates an id from an existing value", () => {
    const value = "profile-123";

    const id = ProfileId.fromString(value);

    expect(id.value).toBe(value);
  });

  it("compares ids by value", () => {
    const first = ProfileId.fromString("profile-123");
    const second = ProfileId.fromString("profile-123");

    expect(first.equals(second)).toBe(true);
  });
});