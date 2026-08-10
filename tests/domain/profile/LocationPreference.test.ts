import { describe, expect, it } from "vitest";

import { LocationPreference } from "../../../src/domain/profile/value-objects/LocationPreference";

describe("LocationPreference Value Object", () => {
  it("creates a valid location preference", () => {
    const location = LocationPreference.create("Helsinki");

    expect(location.value).toBe("Helsinki");
  });

  it("trims surrounding whitespace", () => {
    const location = LocationPreference.create("  Helsinki  ");

    expect(location.value).toBe("Helsinki");
  });

  it("creates a remote location preference", () => {
    const location = LocationPreference.create("Remote");

    expect(location.value).toBe("Remote");
  });

  it("throws for an empty location", () => {
    expect(() => LocationPreference.create("")).toThrow();
  });

  it("throws for a whitespace-only location", () => {
    expect(() => LocationPreference.create("   ")).toThrow();
  });

  it("compares equal location preferences by value", () => {
    const first = LocationPreference.create("Helsinki");
    const second = LocationPreference.create("Helsinki");

    expect(first.equals(second)).toBe(true);
  });

  it("does not consider different locations equal", () => {
    const first = LocationPreference.create("Helsinki");
    const second = LocationPreference.create("Porvoo");

    expect(first.equals(second)).toBe(false);
  });
});