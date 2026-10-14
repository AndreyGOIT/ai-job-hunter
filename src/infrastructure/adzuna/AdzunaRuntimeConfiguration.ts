type AdzunaRuntimeOptions = {
  country: string;
};

export type AdzunaRuntimeConfiguration = {
  appId: string;
  appKey: string;
  country: string;
};

export function loadAdzunaRuntimeConfiguration(
  options: AdzunaRuntimeOptions,
): AdzunaRuntimeConfiguration {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    throw new Error(
      "Missing Adzuna credentials: set ADZUNA_APP_ID and ADZUNA_APP_KEY",
    );
  }

  return {
    appId,
    appKey,
    country: options.country,
  };
}
