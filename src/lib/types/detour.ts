import { Placement } from "@popperjs/core";

import { Offset } from "../types/popper";

import { useDetour } from "../composables/detour";

export type Detour = ReturnType<typeof useDetour>;

export enum DetourStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  FINISHED = "finished",
}

export type DetourPersistenceOptions = {
  type: "local" | "session";
  key: string;
  version?: string | number;
};

export type DetourPersistenceOption = boolean | DetourPersistenceOptions;

export type DetourPersistence = {
  status: DetourStatus;
  stepIndex: number;
};

export type DetourOptions = {
  defaultPlacement?: Placement;
  defaultOffset?: Offset;
  startImmediately?: boolean;
  scrollToTopOnFinish?: boolean;
  persistence?: DetourPersistenceOption;
};
