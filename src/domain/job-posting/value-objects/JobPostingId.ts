export class JobPostingId {
  private constructor(public readonly value: string) {}

  public static create(value?: string): JobPostingId {
    return new JobPostingId(value ?? crypto.randomUUID());
  }

  public equals(other: JobPostingId): boolean {
    return this.value === other.value;
  }
}