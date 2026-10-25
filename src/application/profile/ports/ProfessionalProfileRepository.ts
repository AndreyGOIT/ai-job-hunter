
import { ProfessionalProfile } from "../../../domain/profile/entities/ProfessionalProfile";
import { UserId } from "../../../domain/user/value-objects/UserId";

export interface ProfessionalProfileRepository {
  save(profile: ProfessionalProfile): Promise<void>;

  findByUserId(userId: UserId): Promise<ProfessionalProfile | null>;
}
