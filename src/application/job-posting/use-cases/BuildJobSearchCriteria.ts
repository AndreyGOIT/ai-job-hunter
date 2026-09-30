import { ProfessionalProfile } from "../../../domain/profile/entities/ProfessionalProfile";
import { JobSearchCriteria } from "../queries/JobSearchCriteria";

export class BuildJobSearchCriteria {
  public execute(profile: ProfessionalProfile): JobSearchCriteria {
    return JobSearchCriteria.create({
      keywords: profile.desiredPosition.value,
      location: profile.locationPreference.value,
      workMode: profile.workMode,
      employmentType: profile.employmentType,
    });
  }
}