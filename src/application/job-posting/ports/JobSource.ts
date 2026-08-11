import { JobPosting } from "../../../domain/job-posting/entities/JobPosting";

export interface JobSource {
  fetch(): Promise<readonly JobPosting[]>;
}
