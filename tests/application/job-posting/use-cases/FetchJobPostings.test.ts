import { describe, expect, it } from "vitest";

import { JobSource } from "../../../../src/application/job-posting/ports/JobSource";
import { FetchJobPostings } from "../../../../src/application/job-posting/use-cases/FetchJobPostings";
import { JobPosting } from "../../../../src/domain/job-posting/entities/JobPosting";
import { CompanyName } from "../../../../src/domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../../../src/domain/job-posting/value-objects/JobDescription";
import { JobLocation } from "../../../../src/domain/job-posting/value-objects/JobLocation";
import { JobPostingId } from "../../../../src/domain/job-posting/value-objects/JobPostingId";
import { JobPostingSource } from "../../../../src/domain/job-posting/value-objects/JobPostingSource";
import { JobPostingStatus } from "../../../../src/domain/job-posting/value-objects/JobPostingStatus";
import { JobTitle } from "../../../../src/domain/job-posting/value-objects/JobTitle";
import { EmploymentType } from "../../../../src/domain/profile/value-objects/EmploymentType";
import { WorkMode } from "../../../../src/domain/profile/value-objects/WorkMode";

class FakeJobSource implements JobSource {
  public constructor(private readonly jobPostings: readonly JobPosting[]) {}

  public async fetch(): Promise<readonly JobPosting[]> {
    return this.jobPostings;
  }
}

describe("FetchJobPostings", () => {
  it("returns job postings fetched from the job source", async () => {
    const firstJobPosting = JobPosting.create({
      id: JobPostingId.create(),
      title: JobTitle.create("Full Stack Developer"),
      companyName: CompanyName.create("Acme Oy"),
      description: JobDescription.create("Build web applications."),
      source: JobPostingSource.create("https://example.com/jobs/1"),
      status: JobPostingStatus.create("OPEN"),
      location: JobLocation.create("Helsinki"),
      workMode: WorkMode.create("REMOTE"),
      employmentType: EmploymentType.create("FULL_TIME"),
    });
    const secondJobPosting = JobPosting.create({
      id: JobPostingId.create(),
      title: JobTitle.create("Backend Developer"),
      companyName: CompanyName.create("Example Company"),
      description: JobDescription.create("Build backend services."),
      source: JobPostingSource.create("https://example.com/jobs/2"),
      status: JobPostingStatus.create("OPEN"),
      location: JobLocation.create("Espoo"),
      workMode: WorkMode.create("HYBRID"),
      employmentType: EmploymentType.create("CONTRACT"),
    });
    const useCase = new FetchJobPostings(
      new FakeJobSource([firstJobPosting, secondJobPosting]),
    );

    const jobPostings = await useCase.execute();

    expect(jobPostings).toEqual([firstJobPosting, secondJobPosting]);
  });
});
