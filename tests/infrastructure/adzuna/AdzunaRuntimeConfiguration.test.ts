import { afterEach, describe, expect, it, vi } from "vitest";

import { loadAdzunaRuntimeConfiguration } from "../../../src/infrastructure/adzuna/AdzunaRuntimeConfiguration";

describe("loadAdzunaRuntimeConfiguration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads Adzuna credentials from the runtime environment", () => {
    vi.stubEnv("ADZUNA_APP_ID", "test-app-id");
    vi.stubEnv("ADZUNA_APP_KEY", "test-app-key");

    const configuration = loadAdzunaRuntimeConfiguration({
      country: "gb",
      workMode: "ONSITE",
    });

    expect(configuration).toEqual({
      appId: "test-app-id",
      appKey: "test-app-key",
      country: "gb",
      workMode: "ONSITE",
    });
  });

  it("throws a clear error when credentials are missing", () => {
    vi.stubEnv("ADZUNA_APP_ID", "");
    vi.stubEnv("ADZUNA_APP_KEY", "");

    expect(() =>
      loadAdzunaRuntimeConfiguration({
        country: "gb",
        workMode: "ONSITE",
      }),
    ).toThrow("Missing Adzuna credentials: set ADZUNA_APP_ID and ADZUNA_APP_KEY");
  });
});
