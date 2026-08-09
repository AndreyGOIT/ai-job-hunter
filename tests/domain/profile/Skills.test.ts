import { describe, expect, it } from "vitest";

import { Skills } from "../../../src/domain/profile/value-objects/Skills";

describe("Skills Value Object", () => {
  it("creates skills", () => {
    const skills = Skills.create(["TypeScript", "React", "Node.js"]);

    expect(skills).toBeInstanceOf(Skills);
  });

  it("trims whitespace from skills", () => {
    const skills = Skills.create([
      " TypeScript ",
      " React",
      "Node.js ",
    ]);

    expect(skills.value).toEqual([
      "TypeScript",
      "React",
      "Node.js",
    ]);
  });

  it("rejects an empty skills collection", () => {
    expect(() => Skills.create([])).toThrow();
  });

  it("rejects empty skills", () => {
    expect(() => Skills.create(["TypeScript", ""])).toThrow();
  });

  it("rejects whitespace-only skills", () => {
    expect(() => Skills.create(["TypeScript", "   "])).toThrow();
  });

  it("removes duplicate skills", () => {
    const skills = Skills.create([
      "TypeScript",
      "React",
      "TypeScript",
    ]);

    expect(skills.value).toEqual([
      "TypeScript",
      "React",
    ]);
  });

  it("preserves skill order", () => {
    const skills = Skills.create([
      "TypeScript",
      "React",
      "Node.js",
    ]);

    expect(skills.value).toEqual([
      "TypeScript",
      "React",
      "Node.js",
    ]);
  });

  it("compares skills by value", () => {
    const first = Skills.create(["TypeScript", "React"]);
    const second = Skills.create(["TypeScript", "React"]);

    expect(first.equals(second)).toBe(true);
  });

  it("considers different skill collections different", () => {
    const first = Skills.create(["TypeScript", "React"]);
    const second = Skills.create(["TypeScript", "Node.js"]);

    expect(first.equals(second)).toBe(false);
  });
});