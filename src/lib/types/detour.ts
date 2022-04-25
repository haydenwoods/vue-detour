import { Placement } from "@popperjs/core";

import { Step, Offset } from "@/lib/types/step";
import { useDetour } from "../composables/detour";

export enum DetourStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  FINISHED = "finished",
}

export type Detour = ReturnType<typeof useDetour>;

export type DetourOptions = {
  defaultPlacement?: Placement;
  defaultOffset?: Offset;
  startOnMount?: boolean;
  returnToTopOnFinish?: boolean;
};

export type DetourParams = {
  steps: Step[];
  tooltip: string;
  options?: DetourOptions;
};
