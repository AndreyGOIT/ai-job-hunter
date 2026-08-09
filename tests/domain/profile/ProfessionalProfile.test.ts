import { describe, expect, it } from "vitest";

import { ProfessionalProfile } from "../../../src/domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../../src/domain/profile/value-objects/DesiredPosition";
import { ProfileId } from "../../../src/domain/profile/value-objects/ProfileId";
import { Skills } from "../../../src/domain/profile/value-objects/Skills";

describe("ProfessionalProfile Entity", () => {
  const id = ProfileId.create();
  const desiredPosition = DesiredPosition.create("Full Stack Developer");
  const skills = Skills.create(["TypeScript", "React", "Node.js"]);

  it("creates a professional profile", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    expect(profile).toBeInstanceOf(ProfessionalProfile);
  });

  it("returns its id", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    expect(profile.id.equals(id)).toBe(true);
  });

  it("returns its desired position", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    expect(profile.desiredPosition.equals(desiredPosition)).toBe(true);
  });

  it("returns its skills", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    expect(profile.skills.equals(skills)).toBe(true);
  });

  it("considers profiles with the same id equal", () => {
    const first = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    const second = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    expect(first.equals(second)).toBe(true);
  });

  it("considers profiles with different ids different", () => {
    const first = ProfessionalProfile.create({
      id: ProfileId.create(),
      desiredPosition,
      skills,
    });

    const second = ProfessionalProfile.create({
      id: ProfileId.create(),
      desiredPosition,
      skills,
    });

    expect(first.equals(second)).toBe(false);
  });

  it("updates its desired position", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    const newPosition = DesiredPosition.create("Backend Developer");

    profile.updateDesiredPosition(newPosition);

    expect(profile.desiredPosition.equals(newPosition)).toBe(true);
  });

  it("updates its skills", () => {
    const profile = ProfessionalProfile.create({
      id,
      desiredPosition,
      skills,
    });

    const newSkills = Skills.create(["Python", "FastAPI", "PostgreSQL"]);

    profile.updateSkills(newSkills);

    expect(profile.skills.equals(newSkills)).toBe(true);
  });
});
