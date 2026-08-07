import { describe, expect, it } from "vitest";

import { User } from "../../../src/domain/user/entities/User";
import { Email } from "../../../src/domain/user/value-objects/Email";
import { Language } from "../../../src/domain/user/value-objects/Language";
import { UserId } from "../../../src/domain/user/value-objects/UserId";

describe("User Entity", () => {
  const id = UserId.create();
  const email = Email.create("andy@example.com");
  const language = Language.create("en");

  it("creates a user", () => {
    const user = User.create({
      id,
      email,
      preferredLanguage: language,
    });

    expect(user).toBeInstanceOf(User);
  });

  it("returns its id", () => {
    const user = User.create({ id, email, preferredLanguage: language });

    expect(user.id.equals(id)).toBe(true);
  });

  it("returns its email", () => {
    const user = User.create({ id, email, preferredLanguage: language });

    expect(user.email.equals(email)).toBe(true);
  });

  it("returns its preferred language", () => {
    const user = User.create({ id, email, preferredLanguage: language });

    expect(user.preferredLanguage.equals(language)).toBe(true);
  });

  it("considers users with the same id equal", () => {
    const first = User.create({ id, email, preferredLanguage: language });
    const second = User.create({ id, email, preferredLanguage: language });

    expect(first.equals(second)).toBe(true);
  });

  it("considers users with different ids different", () => {
    const first = User.create({
      id: UserId.create(),
      email,
      preferredLanguage: language,
    });

    const second = User.create({
      id: UserId.create(),
      email,
      preferredLanguage: language,
    });

    expect(first.equals(second)).toBe(false);
  });
});