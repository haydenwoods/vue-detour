import { Placement } from "@popperjs/core";

import { Step, Offset } from "@/lib/types/step";
import { useGuide } from "../composables/guide";

export enum GuideStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  FINISHED = "finished",
}

export type Guide = ReturnType<typeof useGuide>;

export type GuideOptions = {
  defaultPlacement?: Placement;
  defaultOffset?: Offset;
  startOnMount?: boolean;
  returnToTopOnFinish?: boolean;
};

export type GuideParams = {
  steps: Step[];
  tooltip: string;
  options?: GuideOptions;
};
