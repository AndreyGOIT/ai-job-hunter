import { describe, expect, it } from "vitest";
import { Language } from "../../../src/domain/user/value-objects/Language";

describe("Language Value Object", () => {
  it("creates a supported language", () => {
    const language = Language.create("fi");

    expect(language.value).toBe("fi");
  });

  it("normalizes language to lowercase", () => {
    const language = Language.create("EN");

    expect(language.value).toBe("en");
  });

  it("supports all configured languages", () => {
    expect(Language.create("fi").value).toBe("fi");
    expect(Language.create("en").value).toBe("en");
    expect(Language.create("sv").value).toBe("sv");
    expect(Language.create("ru").value).toBe("ru");
  });

  it("throws for an unsupported language", () => {
    expect(() => Language.create("de")).toThrow("Unsupported language: de");
  });

  it("compares equal languages", () => {
    const first = Language.create("FI");
    const second = Language.create("fi");

    expect(first.equals(second)).toBe(true);
  });
});