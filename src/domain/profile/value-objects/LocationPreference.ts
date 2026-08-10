export class LocationPreference {
  private constructor(
    public readonly value: string,
  ) {}

  static create(value: string): LocationPreference {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Location preference cannot be empty");
    }

    return new LocationPreference(normalizedValue);
  }

  equals(other: LocationPreference): boolean {
    return this.value === other.value;
  }
}