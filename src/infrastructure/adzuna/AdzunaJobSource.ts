import { JobSource } from "../../application/job-posting/ports/JobSource";
import { JobPosting } from "../../domain/job-posting/entities/JobPosting";
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

const RESULTS_PER_PAGE = "20";

export class AdzunaJobSource implements JobSource {
  private readonly mapper: AdzunaJobPostingMapper;

  public constructor(private readonly options: AdzunaJobSourceOptions) {
    this.mapper = new AdzunaJobPostingMapper({
      workMode: options.workMode,
    });
  }

  public async fetch(): Promise<readonly JobPosting[]> {
    const response = await globalThis.fetch(this.buildSearchUrl());

    if (!response.ok) {
      throw new Error(`Adzuna request failed with status: ${response.status}`);
    }

    const payload = (await response.json()) as AdzunaSearchResponse;

    return payload.results.map((job) => this.mapper.map(job));
  }

  private buildSearchUrl(): string {
    const url = new URL(
      `https://api.adzuna.com/v1/api/jobs/${this.options.country}/search/1`,
    );

    url.searchParams.set("app_id", this.options.appId);
    url.searchParams.set("app_key", this.options.appKey);
    url.searchParams.set("results_per_page", RESULTS_PER_PAGE);

    return url.toString();
  }
}
