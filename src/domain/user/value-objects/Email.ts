export class Email {
  private constructor(private readonly _value: string) {}

  public static create(value: string): Email {
    const normalized = value.trim().toLowerCase();

    if (normalized.length === 0) {
      throw new Error("Email cannot be empty.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalized)) {
      throw new Error("Invalid email format.");
    }

    return new Email(normalized);
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Email): boolean {
    return this._value === other._value;
  }
}