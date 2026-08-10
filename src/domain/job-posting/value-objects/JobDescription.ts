export class JobDescription {
  private constructor(public readonly value: string) {}

  public static create(value: string): JobDescription {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Job description cannot be empty");
    }

    return new JobDescription(normalizedValue);
  }

  public equals(other: JobDescription): boolean {
    return this.value === other.value;
  }
}