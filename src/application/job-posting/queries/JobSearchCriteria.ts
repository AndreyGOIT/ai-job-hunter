export type JobSearchCriteriaInput = {
  keywords: string;
  location?: string;
  page?: number;
  resultsPerPage?: number;
};

export class JobSearchCriteria {
  private constructor(
    public readonly keywords: string,
    public readonly location: string | undefined,
    public readonly page: number,
    public readonly resultsPerPage: number,
  ) {}

  public static create(input: JobSearchCriteriaInput): JobSearchCriteria {
    if (input.keywords.trim().length === 0) {
      throw new Error("Search keywords cannot be empty");
    }

    const page = input.page ?? 1;

    if (!Number.isInteger(page) || page <= 0) {
      throw new Error("Search page must be a positive integer");
    }

    const resultsPerPage = input.resultsPerPage ?? 20;

    if (!Number.isInteger(resultsPerPage) || resultsPerPage <= 0) {
      throw new Error("Results per page must be a positive integer");
    }

    return new JobSearchCriteria(
      input.keywords,
      input.location,
      page,
      resultsPerPage,
    );
  }
}