
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProfessionalProfile } from "../../../src/domain/profile/entities/ProfessionalProfile";
import { DesiredPosition } from "../../../src/domain/profile/value-objects/DesiredPosition";
import { EmploymentType } from "../../../src/domain/profile/value-objects/EmploymentType";
import { LocationPreference } from "../../../src/domain/profile/value-objects/LocationPreference";
import { ProfileId } from "../../../src/domain/profile/value-objects/ProfileId";
import { Skills } from "../../../src/domain/profile/value-objects/Skills";
import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";
import { UserId } from "../../../src/domain/user/value-objects/UserId";

import { PrismaProfessionalProfileRepository } from "../../../src/infrastructure/prisma/PrismaProfessionalProfileRepository";

describe("PrismaProfessionalProfileRepository", () => {
  const userId = UserId.from("550e8400-e29b-41d4-a716-446655440000");

  const profile = ProfessionalProfile.create({
    id: ProfileId.fromString("profile-123"),
    userId,
    desiredPosition: DesiredPosition.create("Full Stack Developer"),
    skills: Skills.create(["TypeScript", "React", "Node.js"]),
    locationPreference: LocationPreference.create("Porvoo, Finland"),
    workMode: WorkMode.create("HYBRID"),
    employmentType: EmploymentType.create("FULL_TIME"),
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves a profile using its userId as the unique key", async () => {
    const upsert = vi.fn().mockResolvedValue({});
    const prisma = {
      professionalProfile: { upsert },
    };

    const repository = new PrismaProfessionalProfileRepository(
      prisma as never,
    );

    await repository.save(profile);

    expect(upsert).toHaveBeenCalledWith({
      where: { userId: userId.value },
      create: {
        id: "profile-123",
        userId: userId.value,
        desiredPosition: "Full Stack Developer",
        skills: ["TypeScript", "React", "Node.js"],
        locationPreference: "Porvoo, Finland",
        workMode: "HYBRID",
        employmentType: "FULL_TIME",
      },
      update: {
        desiredPosition: "Full Stack Developer",
        skills: ["TypeScript", "React", "Node.js"],
        locationPreference: "Porvoo, Finland",
        workMode: "HYBRID",
        employmentType: "FULL_TIME",
      },
    });
  });

  it("loads a profile by userId", async () => {
    const findUnique = vi.fn().mockResolvedValue({
      id: "profile-123",
      userId: userId.value,
      desiredPosition: "Full Stack Developer",
      skills: ["TypeScript", "React", "Node.js"],
      locationPreference: "Porvoo, Finland",
      workMode: "HYBRID",
      employmentType: "FULL_TIME",
      createdAt: new Date("2026-01-01T10:00:00.000Z"),
      updatedAt: new Date("2026-01-02T10:00:00.000Z"),
    });

    const prisma = {
      professionalProfile: { findUnique },
    };

    const repository = new PrismaProfessionalProfileRepository(
      prisma as never,
    );

    const result = await repository.findByUserId(userId);

    expect(findUnique).toHaveBeenCalledWith({
      where: { userId: userId.value },
    });
    expect(result).toBeInstanceOf(ProfessionalProfile);
    expect(result?.id.value).toBe("profile-123");
    expect(result?.desiredPosition.value).toBe("Full Stack Developer");
  });

  it("returns null when no profile exists for the user", async () => {
    const findUnique = vi.fn().mockResolvedValue(null);
    const prisma = {
      professionalProfile: { findUnique },
    };

    const repository = new PrismaProfessionalProfileRepository(
      prisma as never,
    );

    const result = await repository.findByUserId(userId);

    expect(result).toBeNull();
  });
});
