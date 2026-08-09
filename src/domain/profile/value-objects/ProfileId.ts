export class ProfileId {
  private constructor(public readonly value: string) {}

  public static create(): ProfileId {
    return new ProfileId(crypto.randomUUID());
  }

  public static fromString(value: string): ProfileId {
    return new ProfileId(value);
  }

  public equals(other: ProfileId): boolean {
    return this.value === other.value;
  }
}