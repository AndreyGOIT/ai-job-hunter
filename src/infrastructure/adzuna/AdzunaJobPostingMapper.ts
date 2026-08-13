import { JobPosting } from "../../domain/job-posting/entities/JobPosting";
import { CompanyName } from "../../domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../domain/job-posting/value-objects/JobDescription";
import { JobLocation } from "../../domain/job-posting/value-objects/JobLocation";
import { JobPostingId } from "../../domain/job-posting/value-objects/JobPostingId";
import { JobPostingSource } from "../../domain/job-posting/value-objects/JobPostingSource";
import { JobPostingStatus } from "../../domain/job-posting/value-objects/JobPostingStatus";
import { JobTitle } from "../../domain/job-posting/value-objects/JobTitle";
import { EmploymentType } from "../../domain/profile/value-objects/EmploymentType";
import { WorkMode } from "../../domain/profile/value-objects/WorkMode";

type AdzunaJob = {
  id: string;
  title: string;
  description: string;
  redirect_url: string;
  contract_type: string;
  contract_time?: string;
  company: {
    display_name: string;
  };
  location: {
    area: string[];
    display_name: string;
  };
};

type AdzunaJobPostingMapperOptions = {
  /**
   * The Adzuna search response does not include work-mode data. This value is
   * supplied explicitly; the mapper does not infer it from any Adzuna field.
   */
  workMode: string;
};

export class AdzunaJobPostingMapper {
  public constructor(
    private readonly options: AdzunaJobPostingMapperOptions,
  ) {}

  public map(job: AdzunaJob): JobPosting {
    return JobPosting.create({
      id: JobPostingId.create(),
      title: JobTitle.create(job.title),
      companyName: CompanyName.create(job.company.display_name),
      description: JobDescription.create(job.description),
      source: JobPostingSource.create(job.redirect_url),
      status: JobPostingStatus.create("OPEN"),
      location: JobLocation.create(job.location.display_name),
      employmentType: EmploymentType.create(this.mapEmploymentType(job)),
      workMode: WorkMode.create(this.options.workMode),
    });
  }

  private mapEmploymentType(job: AdzunaJob): string {
    if (job.contract_type === "contract") {
      return "CONTRACT";
    }

    if (job.contract_type === "part_time" || job.contract_time === "part_time") {
      return "PART_TIME";
    }

    if (job.contract_type === "full_time" || job.contract_time === "full_time") {
      return "FULL_TIME";
    }

    throw new Error(`Unsupported Adzuna contract type: ${job.contract_type}`);
  }
}
