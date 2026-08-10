import { describe, expect, it } from "vitest";

import { JobPosting } from "../../../src/domain/job-posting/entities/JobPosting";
import { JobPostingId } from "../../../src/domain/job-posting/value-objects/JobPostingId";
import { JobTitle } from "../../../src/domain/job-posting/value-objects/JobTitle";
import { CompanyName } from "../../../src/domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../../src/domain/job-posting/value-objects/JobDescription";
import { JobPostingSource } from "../../../src/domain/job-posting/value-objects/JobPostingSource";

describe("JobPosting Entity", () => {
  const id = JobPostingId.create();
  const title = JobTitle.create("Full Stack Developer");
  const companyName = CompanyName.create("Acme Oy");
  const description = JobDescription.create(
    "We are looking for a Full Stack Developer.",
  );
  const source = JobPostingSource.create(
    "https://example.com/jobs/full-stack-developer",
  );

  it("creates a job posting", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting).toBeInstanceOf(JobPosting);
  });

  it("returns its id", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting.id.equals(id)).toBe(true);
  });

  it("returns its title", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting.title.equals(title)).toBe(true);
  });

  it("returns its company name", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting.companyName.equals(companyName)).toBe(true);
  });

  it("returns its description", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting.description.equals(description)).toBe(true);
  });

  it("returns its source", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(jobPosting.source.equals(source)).toBe(true);
  });

  it("considers job postings with the same id equal", () => {
    const first = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    const second = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    expect(first.equals(second)).toBe(true);
  });

  it("considers job postings with different ids different", () => {
    const first = JobPosting.create({
      id: JobPostingId.create(),
      title,
      companyName,
      description,
      source,
    });

    const second = JobPosting.create({
      id: JobPostingId.create(),
      title,
      companyName,
      description,
      source,
    });

    expect(first.equals(second)).toBe(false);
  });

  it("updates its description", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    const newDescription = JobDescription.create("Updated job description.");

    jobPosting.updateDescription(newDescription);

    expect(jobPosting.description.equals(newDescription)).toBe(true);
  });

  it("updates its source", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
    });

    const newSource = JobPostingSource.create(
      "https://www.example.com/jobs/updated-source",
    );

    jobPosting.updateSource(newSource);

    expect(jobPosting.source.equals(newSource)).toBe(true);
  });
    
  it("updates its title", () => {
  const jobPosting = JobPosting.create({
    id,
    title,
    companyName,
    description,
    source,
  });

  const newTitle = JobTitle.create("Senior Full Stack Developer");

  jobPosting.updateTitle(newTitle);

  expect(jobPosting.title.equals(newTitle)).toBe(true);
});
});
