import { Placement } from "@popperjs/core";

export type Offset = [number, number];

export type Step = {
  target: string;
  placement?: Placement;
  offset?: Offset;
  props?: Record<string, any>;
  before?: () => void | Promise<void>;
};
