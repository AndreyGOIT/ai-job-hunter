import { JobSource } from "../ports/JobSource";
import { JobPosting } from "../../../domain/job-posting/entities/JobPosting";

export class FetchJobPostings {
  public constructor(private readonly jobSource: JobSource) {}

  public async execute(): Promise<readonly JobPosting[]> {
    return this.jobSource.fetch();
  }
}
