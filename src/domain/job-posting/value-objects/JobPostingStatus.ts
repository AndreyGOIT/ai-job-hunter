export type JobPostingStatusValue = "OPEN" | "CLOSED";

export class JobPostingStatus {
  private constructor(public readonly value: JobPostingStatusValue) {}

  public static create(value: JobPostingStatusValue): JobPostingStatus {
    if (value !== "OPEN" && value !== "CLOSED") {
      throw new Error(`Invalid job posting status: ${value}`);
    }

    return new JobPostingStatus(value);
  }

  public equals(other: JobPostingStatus): boolean {
    return this.value === other.value;
  }
}