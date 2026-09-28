import { afterEach, describe, expect, it, vi } from "vitest";

import { AdzunaJobSource } from "../../../src/infrastructure/adzuna/AdzunaJobSource";

import { JobSearchCriteria } from "../../../src/application/job-posting/queries/JobSearchCriteria";

describe("AdzunaJobSource", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches Adzuna jobs and maps them into job postings", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        results: [
          {
            id: "129698749",
            title: "Javascript Developer",
            description: "JavaScript Developer Corporate ...",
            redirect_url: "https://adzuna.co.uk/jobs/land/ad/129698749",
            contract_type: "permanent",
            contract_time: "full_time",
            company: {
              display_name: "Corporate Project Solutions",
            },
            location: {
              area: ["UK", "South East England", "Buckinghamshire", "Marlow"],
              display_name: "Marlow, Buckinghamshire",
            },
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const jobSource = new AdzunaJobSource({
      appId: "test-app-id",
      appKey: "test-app-key",
      country: "gb",
      workMode: "ONSITE",
    });

    const criteria = JobSearchCriteria.create({
      keywords: "full stack developer",
      location: "Helsinki",
      page: 2,
      resultsPerPage: 10,
    });

    const jobPostings = await jobSource.fetch(criteria);

    expect(fetchMock).toHaveBeenCalledWith(
  "https://api.adzuna.com/v1/api/jobs/gb/search/2?app_id=test-app-id&app_key=test-app-key&results_per_page=10&what=full+stack+developer&where=Helsinki",
);
    expect(jobPostings).toHaveLength(1);
    expect(jobPostings[0].title.value).toBe("Javascript Developer");
    expect(jobPostings[0].workMode.value).toBe("ONSITE");
  });

  it("throws when Adzuna returns an HTTP error response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });
    vi.stubGlobal("fetch", fetchMock);
    const jobSource = new AdzunaJobSource({
      appId: "test-app-id",
      appKey: "test-app-key",
      country: "gb",
      workMode: "ONSITE",
    });

    const criteria = JobSearchCriteria.create({
      keywords: "software developer",
    });

    await expect(jobSource.fetch(criteria)).rejects.toThrow(
      "Adzuna request failed with status: 401",
    );
  });
});
