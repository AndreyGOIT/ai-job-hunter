import { describe, expect, it } from "vitest";

import { JobPosting } from "../../../src/domain/job-posting/entities/JobPosting";
import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";
import { CompanyName } from "../../../src/domain/job-posting/value-objects/CompanyName";
import { JobDescription } from "../../../src/domain/job-posting/value-objects/JobDescription";
import { EmploymentType } from "../../../src/domain/job-posting/value-objects/EmploymentType";
import { JobLocation } from "../../../src/domain/job-posting/value-objects/JobLocation";
import { JobPostingId } from "../../../src/domain/job-posting/value-objects/JobPostingId";
import { JobPostingSource } from "../../../src/domain/job-posting/value-objects/JobPostingSource";
import { JobPostingStatus } from "../../../src/domain/job-posting/value-objects/JobPostingStatus";
import { JobTitle } from "../../../src/domain/job-posting/value-objects/JobTitle";

describe("JobPosting Entity", () => {
  const id = JobPostingId.create();
  const title = JobTitle.create("Full Stack Developer");
  const companyName = CompanyName.create("Example Company");
  const description = JobDescription.create("Develop web applications.");
  const source = JobPostingSource.create("https://www.linkedin.com/jobs/view/123456789");
  const status = JobPostingStatus.create("OPEN");
  const location = JobLocation.create("Helsinki");
  const employmentType = EmploymentType.create("full-time");
  const workMode = WorkMode.create("REMOTE");

  it("creates a job posting", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
      employmentType,
      workMode,
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
      employmentType,
      workMode,
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
      employmentType,
      workMode,
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
      employmentType,
      workMode,
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
      employmentType,
      workMode,
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
      employmentType,
      workMode,
    });

    expect(jobPosting.source.equals(source)).toBe(true);
  });

  it("returns its status", () => {
    const jobPosting = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
      employmentType,
      workMode,
    });

    expect(jobPosting.status.equals(status)).toBe(true);
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
      employmentType,
      workMode,
    });

    const second = JobPosting.create({
      id,
      title,
      companyName,
      description,
      source,
      status,
      location,
      employmentType,
      workMode,
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
      employmentType,
      workMode,
    });

    const second = JobPosting.create({
      id: JobPostingId.create(),
      title,
      companyName,
      description,
      source,
      status,
      location,
      employmentType,
      workMode,
    });

    expect(first.equals(second)).toBe(false);
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
      employmentType,
      workMode,
    });

    const newTitle = JobTitle.create("Senior Full Stack Developer");

    jobPosting.updateTitle(newTitle);

    expect(jobPosting.title.equals(newTitle)).toBe(true);
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
      employmentType,
      workMode,
    });

    const newDescription = JobDescription.create(
      "Develop and maintain backend services.",
    );

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
      employmentType,
      workMode,
    });

    const newSource = JobPostingSource.create(
  "https://example.com/jobs/123",
);

    jobPosting.updateSource(newSource);

    expect(jobPosting.source.equals(newSource)).toBe(true);
  });
});
