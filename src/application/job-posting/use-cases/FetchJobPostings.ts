import { JobPosting } from "../../../domain/job-posting/entities/JobPosting";
import { JobSearchCriteria } from "../queries/JobSearchCriteria";
import { JobSource } from "../ports/JobSource";

export class FetchJobPostings {
  public constructor(private readonly jobSource: JobSource) {}

  public async execute(
    criteria: JobSearchCriteria,
  ): Promise<readonly JobPosting[]> {
    return this.jobSource.fetch(criteria);
  }
}