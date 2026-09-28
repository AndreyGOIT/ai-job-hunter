import { JobPosting } from "../../../domain/job-posting/entities/JobPosting";
import { JobSearchCriteria } from "../queries/JobSearchCriteria";

export interface JobSource {
  fetch(criteria: JobSearchCriteria): Promise<readonly JobPosting[]>;
}