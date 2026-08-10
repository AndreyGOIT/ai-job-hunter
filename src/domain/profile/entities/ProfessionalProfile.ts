import { DesiredPosition } from "../value-objects/DesiredPosition";
import { EmploymentType } from "../value-objects/EmploymentType";
import { LocationPreference } from "../value-objects/LocationPreference";
import { ProfileId } from "../value-objects/ProfileId";
import { Skills } from "../value-objects/Skills";
import { WorkMode } from "../value-objects/WorkMode";

export type ProfessionalProfileProps = {
  id: ProfileId;
  desiredPosition: DesiredPosition;
  skills: Skills;
  locationPreference: LocationPreference;
  workMode: WorkMode;
  employmentType: EmploymentType;
};

export class ProfessionalProfile {
  private constructor(private readonly props: ProfessionalProfileProps) {}

  public static create(props: ProfessionalProfileProps): ProfessionalProfile {
    return new ProfessionalProfile(props);
  }

  public get id(): ProfileId {
    return this.props.id;
  }

  public get desiredPosition(): DesiredPosition {
    return this.props.desiredPosition;
  }

  public get skills(): Skills {
    return this.props.skills;
  }

  public get locationPreference(): LocationPreference {
    return this.props.locationPreference;
  }

  public get workMode(): WorkMode {
    return this.props.workMode;
  }

  public get employmentType(): EmploymentType {
    return this.props.employmentType;
  }

  public equals(other: ProfessionalProfile): boolean {
    return this.id.equals(other.id);
  }

  public updateDesiredPosition(desiredPosition: DesiredPosition): void {
    this.props.desiredPosition = desiredPosition;
  }

  public updateSkills(skills: Skills): void {
    this.props.skills = skills;
  }
}