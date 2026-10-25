
import { describe, expect, it } from "vitest";

import { ProfessionalProfileMapper } from "../../../src/infrastructure/prisma/ProfessionalProfileMapper";
import { ProfessionalProfile } from "../../../src/domain/profile/entities/ProfessionalProfile";
import { ProfileId } from "../../../src/domain/profile/value-objects/ProfileId";
import { UserId } from "../../../src/domain/user/value-objects/UserId";
import { DesiredPosition } from "../../../src/domain/profile/value-objects/DesiredPosition";
import { Skills } from "../../../src/domain/profile/value-objects/Skills";
import { LocationPreference } from "../../../src/domain/profile/value-objects/LocationPreference";
import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";
import { EmploymentType } from "../../../src/domain/profile/value-objects/EmploymentType";

describe("ProfessionalProfileMapper", () => {
  const mapper = new ProfessionalProfileMapper();

  const record = {
    id: "profile-123",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    desiredPosition: "Full Stack Developer",
    skills: ["TypeScript", "React", "Node.js"],
    locationPreference: "Porvoo, Finland",
    workMode: "HYBRID",
    employmentType: "FULL_TIME",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
    updatedAt: new Date("2026-01-02T10:00:00.000Z"),
  };

  it("maps a Prisma record into a ProfessionalProfile", () => {
    const profile = mapper.toDomain(record);

    expect(profile).toBeInstanceOf(ProfessionalProfile);
    expect(profile.id.value).toBe(record.id);
    expect(profile.userId.value).toBe(record.userId);
    expect(profile.desiredPosition.value).toBe(record.desiredPosition);
    expect(profile.skills.value).toEqual(record.skills);
    expect(profile.locationPreference.value).toBe(record.locationPreference);
    expect(profile.workMode.value).toBe(record.workMode);
    expect(profile.employmentType.value).toBe(record.employmentType);
  });

  it("maps a ProfessionalProfile into persistence data", () => {
    const profile = ProfessionalProfile.create({
      id: ProfileId.fromString(record.id),
      userId: UserId.from(record.userId),
      desiredPosition: DesiredPosition.create(record.desiredPosition),
      skills: Skills.create([...record.skills]),
      locationPreference: LocationPreference.create(record.locationPreference),
      workMode: WorkMode.create(record.workMode),
      employmentType: EmploymentType.create(record.employmentType),
    });

    expect(mapper.toPersistence(profile)).toEqual({
      id: record.id,
      userId: record.userId,
      desiredPosition: record.desiredPosition,
      skills: record.skills,
      locationPreference: record.locationPreference,
      workMode: record.workMode,
      employmentType: record.employmentType,
    });
  });
});
