import { describe, expect, it } from "vitest";

import { CreateJobPosting } from "../../../../src/application/job-posting/use-cases/CreateJobPosting";
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

describe("CreateJobPosting", () => {
  it("creates a job posting from validated domain value objects", () => {
    const id = JobPostingId.create();
    const title = JobTitle.create("Full Stack Developer");
    const companyName = CompanyName.create("Acme Oy");
    const description = JobDescription.create("Build web applications.");
    const source = JobPostingSource.create("https://example.com/jobs/123");
    const status = JobPostingStatus.create("OPEN");
    const location = JobLocation.create("Helsinki");
    const workMode = WorkMode.create("REMOTE");
    const employmentType = EmploymentType.create("FULL_TIME");

    const useCase = new CreateJobPosting();

    const jobPosting = useCase.execute({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
      workMode,
      employmentType,
    });

    expect(jobPosting).toBeInstanceOf(JobPosting);
    expect(jobPosting.id.equals(id)).toBe(true);
    expect(jobPosting.title.equals(title)).toBe(true);
    expect(jobPosting.companyName.equals(companyName)).toBe(true);
    expect(jobPosting.description.equals(description)).toBe(true);
    expect(jobPosting.source.equals(source)).toBe(true);
    expect(jobPosting.status.equals(status)).toBe(true);
    expect(jobPosting.location.equals(location)).toBe(true);
    expect(jobPosting.workMode.equals(workMode)).toBe(true);
    expect(jobPosting.employmentType.equals(employmentType)).toBe(true);
  });
});
