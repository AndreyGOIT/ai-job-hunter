import { ProfessionalProfile } from "../../../domain/profile/entities/ProfessionalProfile";
import { JobPosting } from "../../../domain/job-posting/entities/JobPosting";
import { BuildJobSearchCriteria } from "./BuildJobSearchCriteria";
import { FetchJobPostings } from "./FetchJobPostings";

export class SearchJobs {
  public constructor(
    private readonly buildJobSearchCriteria: BuildJobSearchCriteria,
    private readonly fetchJobPostings: FetchJobPostings,
  ) {}

  public async execute(
    profile: ProfessionalProfile,
  ): Promise<readonly JobPosting[]> {
    const criteria = this.buildJobSearchCriteria.execute(profile);

    return this.fetchJobPostings.execute(criteria);
  }
}