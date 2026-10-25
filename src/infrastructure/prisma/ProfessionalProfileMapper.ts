
import { ProfessionalProfile } from "../../domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../domain/profile/value-objects/DesiredPosition";
import { EmploymentType } from "../../domain/profile/value-objects/EmploymentType";
import { LocationPreference } from "../../domain/profile/value-objects/LocationPreference";
import { ProfileId } from "../../domain/profile/value-objects/ProfileId";
import { Skills } from "../../domain/profile/value-objects/Skills";
import { WorkMode } from "../../domain/profile/value-objects/WorkMode";
import { UserId } from "../../domain/user/value-objects/UserId";
import type { ProfessionalProfileModel } from "../../generated/prisma/models/ProfessionalProfile";

export type ProfessionalProfilePersistenceData = Pick<
  ProfessionalProfileModel,
  | "id"
  | "userId"
  | "desiredPosition"
  | "skills"
  | "locationPreference"
  | "workMode"
  | "employmentType"
>;

export class ProfessionalProfileMapper {
  public toDomain(record: ProfessionalProfilePersistenceData): ProfessionalProfile {
    return ProfessionalProfile.create({
      id: ProfileId.fromString(record.id),
      userId: UserId.from(record.userId),
      desiredPosition: DesiredPosition.create(record.desiredPosition),
      skills: Skills.create([...record.skills]),
      locationPreference: LocationPreference.create(record.locationPreference),
      workMode: WorkMode.create(record.workMode),
      employmentType: EmploymentType.create(record.employmentType),
    });
  }

  public toPersistence(
    profile: ProfessionalProfile,
  ): ProfessionalProfilePersistenceData {
    return {
      id: profile.id.value,
      userId: profile.userId.value,
      desiredPosition: profile.desiredPosition.value,
      skills: [...profile.skills.value],
      locationPreference: profile.locationPreference.value,
      workMode: profile.workMode.value,
      employmentType: profile.employmentType.value,
    };
  }
}
