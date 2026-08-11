import { describe, expect, it } from "vitest";

import { JobPosting } from "../../../src/domain/job-posting/entities/JobPosting";
import { JobPostingId } from "../../../src/domain/job-posting/value-objects/JobPostingId";
import { JobTitle } from "../../../src/domain/job-posting/value-objects/JobTitle";
import { CompanyName } from "../../../src/domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../../src/domain/job-posting/value-objects/JobDescription";
import { JobPostingSource } from "../../../src/domain/job-posting/value-objects/JobPostingSource";
import { JobPostingStatus } from "../../../src/domain/job-posting/value-objects/JobPostingStatus";
import { JobLocation } from "../../../src/domain/job-posting/value-objects/JobLocation";

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
  const status = JobPostingStatus.create("OPEN");
  const location = JobLocation.create("Helsinki");

  it("creates a job posting", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
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
      status,
      location,
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
      status,
      location,
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
      status,
      location,
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
      status,
      location,
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
      status,
      location,
    });

    expect(jobPosting.source.equals(source)).toBe(true);
  });

  it("returns its location", () => {
  const jobPosting = JobPosting.create({
    id,
    title,
    companyName,
    description,
    source,
    status,
    location,
  });

  expect(jobPosting.location.equals(location)).toBe(true);
});

  it("considers job postings with the same id equal", () => {
    const first = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
    });

    const second = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
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
      status,
      location,
    });

    const second = JobPosting.create({
      id: JobPostingId.create(),
      title,
      companyName,
      description,
      source,
      status,
      location,
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
      status,
      location,
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
      status,
      location,
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
    status,
    location,
  });

  const newTitle = JobTitle.create("Senior Full Stack Developer");

  jobPosting.updateTitle(newTitle);

  expect(jobPosting.title.equals(newTitle)).toBe(true);
});
});
