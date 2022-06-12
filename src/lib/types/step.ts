import { Placement } from "@popperjs/core";

import { Offset } from "./popper";

export type DetourStep<Props = Record<string, any>> = {
  target: string;
  placement?: Placement;
  offset?: Offset;
  props?: Props;
  before?: () => void | Promise<void>;
};
