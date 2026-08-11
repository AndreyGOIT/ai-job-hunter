export class JobLocation {
  private constructor(public readonly value: string) {}

  public static create(value: string): JobLocation {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Job location cannot be empty");
    }

    if (normalizedValue.length > 200) {
      throw new Error("Job location cannot exceed 200 characters");
    }

    return new JobLocation(normalizedValue);
  }

  public equals(other: JobLocation): boolean {
    return this.value === other.value;
  }
}