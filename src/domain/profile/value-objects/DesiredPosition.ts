export class DesiredPosition {
  private constructor(public readonly value: string) {}

  public static create(value: string): DesiredPosition {
    const normalizedValue = value.trim();

    if (normalizedValue.length === 0) {
      throw new Error("Desired position cannot be empty");
    }

    return new DesiredPosition(normalizedValue);
  }

  public equals(other: DesiredPosition): boolean {
    return this.value === other.value;
  }
}