export class JobTitle {
  private constructor(public readonly value: string) {}

  public static create(value: string): JobTitle {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Job title cannot be empty");
    }

    return new JobTitle(normalizedValue);
  }

  public equals(other: JobTitle): boolean {
    return this.value === other.value;
  }
}
