
import type { ProfessionalProfileRepository } from "../../application/profile/ports/ProfessionalProfileRepository";
import { ProfessionalProfile } from "../../domain/profile/entities/ProfessionalProfile";
import { UserId } from "../../domain/user/value-objects/UserId";
import {
  ProfessionalProfileMapper,
  type ProfessionalProfilePersistenceData,
} from "./ProfessionalProfileMapper";
import type { PrismaClient } from "../../generated/prisma/client";
import { getPrismaClient } from "./prismaClient";

type PrismaProfileModel = Pick<
  PrismaClient["professionalProfile"],
  "upsert" | "findUnique"
>;

export class PrismaProfessionalProfileRepository
  implements ProfessionalProfileRepository
{
  private readonly mapper = new ProfessionalProfileMapper();
  private readonly profileModel: PrismaProfileModel;

  constructor(client?: PrismaClient) {
    this.profileModel = (client ?? getPrismaClient()).professionalProfile;
  }

  public async save(profile: ProfessionalProfile): Promise<void> {
    const data: ProfessionalProfilePersistenceData =
      this.mapper.toPersistence(profile);

    await this.profileModel.upsert({
      where: { userId: data.userId },
      create: data,
      update: {
        desiredPosition: data.desiredPosition,
        skills: data.skills,
        locationPreference: data.locationPreference,
        workMode: data.workMode,
        employmentType: data.employmentType,
      },
    });
  }

  public async findByUserId(
    userId: UserId,
  ): Promise<ProfessionalProfile | null> {
    const record = await this.profileModel.findUnique({
      where: { userId: userId.value },
    });

    if (!record) {
      return null;
    }

    return this.mapper.toDomain(record);
  }
}
