import { describe, expect, it } from "vitest";

import { ProfessionalProfile } from "../../../src/domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../../src/domain/profile/value-objects/DesiredPosition";
import { ProfileId } from "../../../src/domain/profile/value-objects/ProfileId";
import { Skills } from "../../../src/domain/profile/value-objects/Skills";
import { LocationPreference } from "../../../src/domain/profile/value-objects/LocationPreference";
import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";
import { EmploymentType } from "../../../src/domain/profile/value-objects/EmploymentType";
import { UserId } from "../../../src/domain/user/value-objects/UserId";

describe("ProfessionalProfile Entity", () => {
  const id = ProfileId.create();
  const userId = UserId.create();
  const desiredPosition = DesiredPosition.create("Full Stack Developer");
  const skills = Skills.create(["TypeScript", "React", "Node.js"]);
  const locationPreference = LocationPreference.create("Helsinki");
  const workMode = WorkMode.create("HYBRID");
  const employmentType = EmploymentType.create("FULL_TIME");

  it("creates a professional profile", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile).toBeInstanceOf(ProfessionalProfile);
  });

  it("returns its id", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.id.equals(id)).toBe(true);
  });

  it("returns its desired position", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.desiredPosition.equals(desiredPosition)).toBe(true);
  });

  it("returns its skills", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.skills.equals(skills)).toBe(true);
  });

  it("returns its location preference", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.locationPreference.equals(locationPreference)).toBe(true);
  });

  it("returns its work mode", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.workMode.equals(workMode)).toBe(true);
  });

  it("returns its employment type", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(profile.employmentType.equals(employmentType)).toBe(true);
  });

  it("considers profiles with the same id equal", () => {
    const first = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    const second = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(first.equals(second)).toBe(true);
  });

  it("considers profiles with different ids different", () => {
    const first = ProfessionalProfile.create({
      id: ProfileId.create(),
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    const second = ProfessionalProfile.create({
      id: ProfileId.create(),
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    expect(first.equals(second)).toBe(false);
  });

  it("updates its desired position", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    const newPosition = DesiredPosition.create("Backend Developer");

    profile.updateDesiredPosition(newPosition);

    expect(profile.desiredPosition.equals(newPosition)).toBe(true);
  });

  it("updates its skills", () => {
    const profile = ProfessionalProfile.create({
      id,
      userId,
      desiredPosition,
      skills,
      locationPreference,
      workMode,
      employmentType,
    });

    const newSkills = Skills.create(["Python", "FastAPI", "PostgreSQL"]);

    profile.updateSkills(newSkills);

    expect(profile.skills.equals(newSkills)).toBe(true);
  });

  it("returns its user id", () => {
  const profile = ProfessionalProfile.create({
    id,
    userId,
    desiredPosition,
    skills,
    locationPreference,
    workMode,
    employmentType,
  });

  expect(profile.userId.equals(userId)).toBe(true);
});

it("associates the profile with the specified user", () => {
  const anotherUserId = UserId.create();

  const profile = ProfessionalProfile.create({
    id,
    userId: anotherUserId,
    desiredPosition,
    skills,
    locationPreference,
    workMode,
    employmentType,
  });

  expect(profile.userId.equals(anotherUserId)).toBe(true);
});
});
