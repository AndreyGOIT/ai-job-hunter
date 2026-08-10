const WORK_MODES = ["REMOTE", "HYBRID", "ONSITE"] as const;

type WorkModeValue = (typeof WORK_MODES)[number];

export class WorkMode {
  private constructor(
    public readonly value: WorkModeValue,
  ) {}

  static create(value: string): WorkMode {
    if (!WORK_MODES.includes(value as WorkModeValue)) {
      throw new Error(`Unsupported work mode: ${value}`);
    }

    return new WorkMode(value as WorkModeValue);
  }

  equals(other: WorkMode): boolean {
    return this.value === other.value;
  }
}