import { JobSource } from "../../application/job-posting/ports/JobSource";
import { JobPosting } from "../../domain/job-posting/entities/JobPosting";
import { JobSearchCriteria } from "../../application/job-posting/queries/JobSearchCriteria";
import { AdzunaJobPostingMapper } from "./AdzunaJobPostingMapper";

type AdzunaJob = Parameters<AdzunaJobPostingMapper["map"]>[0];

type AdzunaSearchResponse = {
  results: readonly AdzunaJob[];
};

type AdzunaJobSourceOptions = {
  appId: string;
  appKey: string;
  country: string;
  workMode: string;
};

export class AdzunaJobSource implements JobSource {
  private readonly mapper: AdzunaJobPostingMapper;

  public constructor(private readonly options: AdzunaJobSourceOptions) {
    this.mapper = new AdzunaJobPostingMapper({
      workMode: options.workMode,
    });
  }

  public async fetch(
    criteria: JobSearchCriteria,
  ): Promise<readonly JobPosting[]> {
    const response = await globalThis.fetch(this.buildSearchUrl(criteria));

    if (!response.ok) {
      throw new Error(`Adzuna request failed with status: ${response.status}`);
    }

    const payload = (await response.json()) as AdzunaSearchResponse;

    const jobPostings: JobPosting[] = [];

    for (const job of payload.results) {
      try {
        jobPostings.push(this.mapper.map(job));
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message.startsWith("Unsupported Adzuna contract type:")
        ) {
          continue;
        }

        throw error;
      }
    }

    return jobPostings;
  }

  private buildSearchUrl(criteria: JobSearchCriteria): string {
    const url = new URL(
      `https://api.adzuna.com/v1/api/jobs/${this.options.country}/search/${criteria.page}`,
    );

    url.searchParams.set("app_id", this.options.appId);
    url.searchParams.set("app_key", this.options.appKey);
    url.searchParams.set("results_per_page", String(criteria.resultsPerPage));
    url.searchParams.set("what", criteria.keywords);

    if (criteria.location !== undefined) {
      url.searchParams.set("where", criteria.location);
    }

    return url.toString();
  }
}
