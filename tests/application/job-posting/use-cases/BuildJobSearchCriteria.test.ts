import { describe, expect, it } from "vitest";

import { BuildJobSearchCriteria } from "../../../../src/application/job-posting/use-cases/BuildJobSearchCriteria";
import { ProfessionalProfile } from "../../../../src/domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../../../src/domain/profile/value-objects/DesiredPosition";
import { EmploymentType } from "../../../../src/domain/profile/value-objects/EmploymentType";
import { LocationPreference } from "../../../../src/domain/profile/value-objects/LocationPreference";
import { ProfileId } from "../../../../src/domain/profile/value-objects/ProfileId";
import { Skills } from "../../../../src/domain/profile/value-objects/Skills";
import { WorkMode } from "../../../../src/domain/profile/value-objects/WorkMode";

describe("BuildJobSearchCriteria", () => {
  it("builds search criteria from professional profile preferences", () => {
    const profile = ProfessionalProfile.create({
      id: ProfileId.create(),
      desiredPosition: DesiredPosition.create("Full Stack Developer"),
      skills: Skills.create(["TypeScript", "React", "Node.js"]),
      locationPreference: LocationPreference.create("Helsinki"),
      workMode: WorkMode.create("HYBRID"),
      employmentType: EmploymentType.create("FULL_TIME"),
    });

    const useCase = new BuildJobSearchCriteria();

    const criteria = useCase.execute(profile);

    expect(criteria.keywords).toBe("Full Stack Developer");
    expect(criteria.location).toBe("Helsinki");
    expect(criteria.workMode?.equals(profile.workMode)).toBe(true);
    expect(criteria.employmentType?.equals(profile.employmentType)).toBe(true);
    expect(criteria.page).toBe(1);
    expect(criteria.resultsPerPage).toBe(20);
  });
});
