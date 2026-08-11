export type EmploymentTypeValue =
  | "full-time"
  | "part-time"
  | "contract"
  | "temporary"
  | "internship";

const VALID_EMPLOYMENT_TYPES: readonly EmploymentTypeValue[] = [
  "full-time",
  "part-time",
  "contract",
  "temporary",
  "internship",
];

export class EmploymentType {
  private constructor(public readonly value: EmploymentTypeValue) {}

  public static create(value: string): EmploymentType {
    if (!VALID_EMPLOYMENT_TYPES.includes(value as EmploymentTypeValue)) {
      throw new Error("Invalid employment type");
    }

    return new EmploymentType(value as EmploymentTypeValue);
  }

  public equals(other: EmploymentType): boolean {
    return this.value === other.value;
  }
}