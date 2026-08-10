const EMPLOYMENT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
] as const;

type EmploymentTypeValue = (typeof EMPLOYMENT_TYPES)[number];

export class EmploymentType {
  private constructor(
    public readonly value: EmploymentTypeValue,
  ) {}

  static create(value: string): EmploymentType {
    if (!EMPLOYMENT_TYPES.includes(value as EmploymentTypeValue)) {
      throw new Error(`Unsupported employment type: ${value}`);
    }

    return new EmploymentType(value as EmploymentTypeValue);
  }

  equals(other: EmploymentType): boolean {
    return this.value === other.value;
  }
}