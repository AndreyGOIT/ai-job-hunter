export class CompanyName {
  private constructor(public readonly value: string) {}

  public static create(value: string): CompanyName {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Company name cannot be empty");
    }

    return new CompanyName(normalizedValue);
  }

  public equals(other: CompanyName): boolean {
    return this.value === other.value;
  }
}