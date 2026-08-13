import { FetchJobPostings } from "../src/application/job-posting/use-cases/FetchJobPostings";
import { AdzunaJobSource } from "../src/infrastructure/adzuna/AdzunaJobSource";
import { loadAdzunaRuntimeConfiguration } from "../src/infrastructure/adzuna/AdzunaRuntimeConfiguration";

async function run(): Promise<void> {
  const configuration = loadAdzunaRuntimeConfiguration({
    country: process.env.ADZUNA_COUNTRY ?? "gb",
    workMode: process.env.ADZUNA_WORK_MODE ?? "ONSITE",
  });
  const jobSource = new AdzunaJobSource(configuration);
  const fetchJobPostings = new FetchJobPostings(jobSource);
  const jobPostings = await fetchJobPostings.execute();

  console.info(`Received ${jobPostings.length} Adzuna job postings.`);

  for (const jobPosting of jobPostings.slice(0, 3)) {
    console.info({
      title: jobPosting.title.value,
      company: jobPosting.companyName.value,
      location: jobPosting.location.value,
    });
  }
}

run().catch((error: unknown) => {
  if (
    error instanceof Error &&
    error.message ===
      "Missing Adzuna credentials: set ADZUNA_APP_ID and ADZUNA_APP_KEY"
  ) {
    console.error(error.message);
  } else {
    console.error("Adzuna smoke test failed. Check credentials and network access.");
  }

  process.exitCode = 1;
});
