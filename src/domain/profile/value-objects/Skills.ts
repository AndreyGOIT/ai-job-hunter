export class Skills {
  private constructor(public readonly value: readonly string[]) {}

  public static create(values: string[]): Skills {
    const normalizedValues = values.map((value) => value.trim());

    if (normalizedValues.some((value) => value.length === 0)) {
      throw new Error("Skills cannot contain empty values");
    }

    const uniqueValues = [...new Set(normalizedValues)];

    if (uniqueValues.length === 0) {
      throw new Error("Skills cannot be empty");
    }

    return new Skills(uniqueValues);
  }

  public equals(other: Skills): boolean {
    if (this.value.length !== other.value.length) {
      return false;
    }

    return this.value.every((skill, index) => skill === other.value[index]);
  }
}