import { describe, expect, it } from "vitest";

import { AdzunaJobPostingMapper } from "../../../src/infrastructure/adzuna/AdzunaJobPostingMapper";
import { WorkMode } from "../../../src/domain/profile/value-objects/WorkMode";

describe("AdzunaJobPostingMapper", () => {
  it("maps an Adzuna job response into a JobPosting", () => {
    const adzunaJob = {
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
    };
    const mapper = new AdzunaJobPostingMapper({
      workMode: "ONSITE",
    });

    const jobPosting = mapper.map(adzunaJob);

    expect(jobPosting.id.value).not.toBe(adzunaJob.id);
    expect(jobPosting.title.value).toBe("Javascript Developer");
    expect(jobPosting.companyName.value).toBe("Corporate Project Solutions");
    expect(jobPosting.description.value).toBe(
      "JavaScript Developer Corporate ...",
    );
    expect(jobPosting.source.value).toBe(adzunaJob.redirect_url);
    expect(jobPosting.location.value).toBe("Marlow, Buckinghamshire");
    expect(jobPosting.employmentType.value).toBe("FULL_TIME");
    expect(jobPosting.workMode.equals(WorkMode.create("ONSITE"))).toBe(true);
    expect(jobPosting.status.value).toBe("OPEN");
  });

  it("throws for an unsupported Adzuna contract type", () => {
    const adzunaJob = {
      id: "129698749",
      title: "Javascript Developer",
      description: "JavaScript Developer Corporate ...",
      redirect_url: "https://adzuna.co.uk/jobs/land/ad/129698749",
      contract_type: "temporary",
      company: {
        display_name: "Corporate Project Solutions",
      },
      location: {
        area: ["UK", "South East England", "Buckinghamshire", "Marlow"],
        display_name: "Marlow, Buckinghamshire",
      },
    };
    const mapper = new AdzunaJobPostingMapper({
      workMode: "ONSITE",
    });

    expect(() => mapper.map(adzunaJob)).toThrow(
      "Unsupported Adzuna contract type: temporary",
    );
  });
});
