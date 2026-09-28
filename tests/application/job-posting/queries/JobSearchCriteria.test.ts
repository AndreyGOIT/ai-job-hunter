import { describe, expect, it } from "vitest";

import { JobSearchCriteria } from "../../../../src/application/job-posting/queries/JobSearchCriteria";

describe("JobSearchCriteria", () => {
  it("creates criteria with defaults", () => {
    const criteria = JobSearchCriteria.create({
      keywords: "software developer",
    });

    expect(criteria.keywords).toBe("software developer");
    expect(criteria.location).toBeUndefined();
    expect(criteria.page).toBe(1);
    expect(criteria.resultsPerPage).toBe(20);
  });

  it("creates criteria with explicit search parameters", () => {
    const criteria = JobSearchCriteria.create({
      keywords: "full stack developer",
      location: "Finland",
      page: 2,
      resultsPerPage: 10,
    });

    expect(criteria.keywords).toBe("full stack developer");
    expect(criteria.location).toBe("Finland");
    expect(criteria.page).toBe(2);
    expect(criteria.resultsPerPage).toBe(10);
  });

  it("rejects empty keywords", () => {
    expect(() =>
      JobSearchCriteria.create({
        keywords: "",
      }),
    ).toThrow("Search keywords cannot be empty");
  });

  it("rejects invalid page", () => {
    expect(() =>
      JobSearchCriteria.create({
        keywords: "software developer",
        page: 0,
      }),
    ).toThrow("Search page must be a positive integer");
  });

  it("rejects invalid results per page", () => {
    expect(() =>
      JobSearchCriteria.create({
        keywords: "software developer",
        resultsPerPage: 0,
      }),
    ).toThrow("Results per page must be a positive integer");
  });
});