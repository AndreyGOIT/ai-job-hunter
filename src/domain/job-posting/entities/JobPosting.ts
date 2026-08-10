import { CompanyName } from "../value-objects/CompanyName";
import { JobDescription } from "../value-objects/JobDescription";
import { JobPostingId } from "../value-objects/JobPostingId";
import { JobPostingSource } from "../value-objects/JobPostingSource";
import { JobTitle } from "../value-objects/JobTitle";

export type JobPostingProps = {
  id: JobPostingId;
  title: JobTitle;
  companyName: CompanyName;
  description: JobDescription;
  source: JobPostingSource;
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

  public equals(other: JobPosting): boolean {
    return this.id.equals(other.id);
  }
}
