import { describe, expect, it } from "vitest";

import { BuildJobSearchCriteria } from "../../../../src/application/job-posting/use-cases/BuildJobSearchCriteria";
import { FetchJobPostings } from "../../../../src/application/job-posting/use-cases/FetchJobPostings";
import { SearchJobs } from "../../../../src/application/job-posting/use-cases/SearchJobs";
import { JobSearchCriteria } from "../../../../src/application/job-posting/queries/JobSearchCriteria";
import { ProfessionalProfile } from "../../../../src/domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../../../src/domain/profile/value-objects/DesiredPosition";
import { EmploymentType } from "../../../../src/domain/profile/value-objects/EmploymentType";
import { LocationPreference } from "../../../../src/domain/profile/value-objects/LocationPreference";
import { ProfileId } from "../../../../src/domain/profile/value-objects/ProfileId";
import { Skills } from "../../../../src/domain/profile/value-objects/Skills";
import { WorkMode } from "../../../../src/domain/profile/value-objects/WorkMode";
import { JobPosting } from "../../../../src/domain/job-posting/entities/JobPosting";
import { CompanyName } from "../../../../src/domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../../../src/domain/job-posting/value-objects/JobDescription";
import { JobLocation } from "../../../../src/domain/job-posting/value-objects/JobLocation";
import { JobPostingId } from "../../../../src/domain/job-posting/value-objects/JobPostingId";
import { JobPostingSource } from "../../../../src/domain/job-posting/value-objects/JobPostingSource";
import { JobPostingStatus } from "../../../../src/domain/job-posting/value-objects/JobPostingStatus";
import { JobTitle } from "../../../../src/domain/job-posting/value-objects/JobTitle";

class FakeBuildJobSearchCriteria extends BuildJobSearchCriteria {
  public receivedProfile: ProfessionalProfile | undefined;

  public override execute(
    profile: ProfessionalProfile,
  ): JobSearchCriteria {
    this.receivedProfile = profile;

    return JobSearchCriteria.create({
      keywords: "full stack developer",
      location: "Helsinki",
    });
  }
}

class FakeFetchJobPostings extends FetchJobPostings {
  public receivedCriteria: JobSearchCriteria | undefined;

  public constructor(private readonly jobPostings: readonly JobPosting[]) {
    super({
      fetch: async (criteria: JobSearchCriteria) => {
        this.receivedCriteria = criteria;
        return this.jobPostings;
      },
    });
  }
}

describe("SearchJobs", () => {
  it("searches jobs using the professional profile preferences", async () => {
    const profile = ProfessionalProfile.create({
      id: ProfileId.create(),
      desiredPosition: DesiredPosition.create("Full Stack Developer"),
      skills: Skills.create(["TypeScript", "React", "Node.js"]),
      locationPreference: LocationPreference.create("Helsinki"),
      workMode: WorkMode.create("HYBRID"),
      employmentType: EmploymentType.create("FULL_TIME"),
    });

    const firstJobPosting = JobPosting.create({
      id: JobPostingId.create(),
      title: JobTitle.create("Full Stack Developer"),
      companyName: CompanyName.create("Acme Oy"),
      description: JobDescription.create("Build web applications."),
      source: JobPostingSource.create("https://example.com/jobs/1"),
      status: JobPostingStatus.create("OPEN"),
      location: JobLocation.create("Helsinki"),
      workMode: WorkMode.create("HYBRID"),
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
      workMode: WorkMode.create("REMOTE"),
      employmentType: EmploymentType.create("CONTRACT"),
    });

    const buildCriteria = new FakeBuildJobSearchCriteria();
    const fetchPostings = new FakeFetchJobPostings([
      firstJobPosting,
      secondJobPosting,
    ]);

    const useCase = new SearchJobs(buildCriteria, fetchPostings);

    const jobPostings = await useCase.execute(profile);

    expect(buildCriteria.receivedProfile).toBe(profile);
    expect(fetchPostings.receivedCriteria?.keywords).toBe(
      "full stack developer",
    );
    expect(fetchPostings.receivedCriteria?.location).toBe("Helsinki");
    expect(jobPostings).toEqual([firstJobPosting, secondJobPosting]);
  });
});