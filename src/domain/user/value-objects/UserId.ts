import { randomUUID } from "node:crypto";

export class UserId {
  private constructor(private readonly _value: string) {}

  public static create(): UserId {
    return new UserId(randomUUID());
  }

  public static from(value: string): UserId {
    const normalized = value.trim();

    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidV4Regex.test(normalized)) {
      throw new Error("Invalid UserId format.");
    }

    return new UserId(normalized);
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: UserId): boolean {
    return this._value === other._value;
  }
}