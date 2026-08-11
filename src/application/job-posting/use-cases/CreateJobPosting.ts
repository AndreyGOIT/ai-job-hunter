import {
  JobPosting,
  type JobPostingProps,
} from "../../../domain/job-posting/entities/JobPosting";

export class CreateJobPosting {
  public execute(props: JobPostingProps): JobPosting {
    return JobPosting.create(props);
  }
}
