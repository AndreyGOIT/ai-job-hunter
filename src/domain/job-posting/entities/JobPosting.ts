import { CompanyName } from "../value-objects/CompanyName";
import { JobDescription } from "../value-objects/JobDescription";
import { JobPostingId } from "../value-objects/JobPostingId";
import { JobPostingSource } from "../value-objects/JobPostingSource";
import { JobPostingStatus } from "../value-objects/JobPostingStatus";
import { JobTitle } from "../value-objects/JobTitle";
import { JobLocation } from "../value-objects/JobLocation";
import { EmploymentType } from "../value-objects/EmploymentType";
import { WorkMode } from "../../profile/value-objects/WorkMode";

export type JobPostingProps = {
  id: JobPostingId;
  title: JobTitle;
  companyName: CompanyName;
  description: JobDescription;
  source: JobPostingSource;
  status: JobPostingStatus;
  location: JobLocation;
  employmentType: EmploymentType;
  workMode: WorkMode;
};

export class JobPosting {
  private constructor(private readonly props: JobPostingProps) {}

  public static create(props: JobPostingProps): JobPosting {
    return new JobPosting(props);
  }

  public get id(): JobPostingId {
    return this.props.id;
  }

  public get title(): JobTitle {
    return this.props.title;
  }

  public updateTitle(title: JobTitle): void {
    this.props.title = title;
  }

  public get companyName(): CompanyName {
    return this.props.companyName;
  }

  public get description(): JobDescription {
    return this.props.description;
  }

  public updateDescription(description: JobDescription): void {
    this.props.description = description;
  }

  public get source(): JobPostingSource {
    return this.props.source;
  }

  public updateSource(source: JobPostingSource): void {
    this.props.source = source;
  }

  public get status(): JobPostingStatus {
    return this.props.status;
  }

  public updateStatus(status: JobPostingStatus): void {
    this.props.status = status;
  }

  public get location(): JobLocation {
    return this.props.location;
  }

  public get employmentType(): EmploymentType {
    return this.props.employmentType;
  }

  public get workMode(): WorkMode {
    return this.props.workMode;
  }

  public equals(other: JobPosting): boolean {
    return this.id.equals(other.id);
  }
}
