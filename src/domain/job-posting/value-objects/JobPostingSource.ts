export class JobPostingSource {
  private constructor(public readonly value: string) {}

  public static create(value: string): JobPostingSource {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      throw new Error("Job posting source cannot be empty");
    }

    try {
      new URL(normalizedValue);
    } catch {
      throw new Error("Job posting source must be a valid URL");
    }

    return new JobPostingSource(normalizedValue);
  }

  public equals(other: JobPostingSource): boolean {
    return this.value === other.value;
  }
}
