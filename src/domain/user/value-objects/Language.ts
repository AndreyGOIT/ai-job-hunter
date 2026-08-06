export const SUPPORTED_LANGUAGES = ["fi", "en", "sv", "ru"] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export class Language {
  private constructor(private readonly _value: LanguageCode) {}

  public static create(value: string): Language {
    const normalized = value.trim().toLowerCase();

    if (!SUPPORTED_LANGUAGES.includes(normalized as LanguageCode)) {
      throw new Error(`Unsupported language: ${value}`);
    }

    return new Language(normalized as LanguageCode);
  }

  public get value(): LanguageCode {
    return this._value;
  }

  public equals(other: Language): boolean {
    return this._value === other._value;
  }
}