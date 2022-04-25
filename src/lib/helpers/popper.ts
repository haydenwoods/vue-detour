import {
  Instance,
  Placement,
  createPopper as _createPopper,
} from "@popperjs/core";

import { DetourOptions } from "@/lib/types/detour";
import { Step, Offset } from "@/lib/types/step";

const DEFAULT_PLACEMENT: Placement = "auto";
const DEFAULT_OFFSET: Offset = [0, 10];

export const getPlacement = ({
  step,
  options,
}: {
  step: Step;
  options?: DetourOptions;
}) => {
  return step.placement ?? options?.defaultPlacement ?? DEFAULT_PLACEMENT;
};

export const getModifiers = ({
  step,
  options,
}: {
  step: Step;
  options?: DetourOptions;
}) => {
  return [
    {
      name: "offset",
      options: {
        offset: step.offset ?? options?.defaultOffset ?? DEFAULT_OFFSET,
      },
    },
    {
      name: "computeStyles",
      options: {
        adaptive: false,
        gpuAcceleration: true,
      },
    },
    {
      name: "arrow",
      options: {
        padding: 10,
      },
    },
  ];
};

export const getTargetElement = ({ step }: { step: Step }) => {
  return document.querySelector(step.target);
};

export const getTooltipElement = ({ tooltip }: { tooltip: string }) => {
  const element = document.querySelector(tooltip);

  if (!element || !(element instanceof HTMLElement)) return;

  return element;
};

export const showTooltipElement = ({ tooltip }: { tooltip: string }) => {
  const tooltipElement = getTooltipElement({ tooltip });

  if (!tooltipElement) return;

  tooltipElement.style.opacity = "1";
  tooltipElement.style.pointerEvents = "all";
};

export const hideTooltipElement = ({ tooltip }: { tooltip: string }) => {
  const tooltipElement = getTooltipElement({ tooltip });

  if (!tooltipElement) return;

  tooltipElement.style.opacity = "0";
  tooltipElement.style.pointerEvents = "none";
};

export const createPopper = ({
  step,
  tooltip,
  options,
}: {
  step: Step;
  tooltip: string;
  options?: DetourOptions;
}) => {
  const tooltipElement = getTooltipElement({ tooltip });

  if (!tooltipElement) return;

  const targetElement = getTargetElement({ step });

  if (!targetElement) return;

  return _createPopper(targetElement, tooltipElement, {
    placement: getPlacement({ step, options }),
    modifiers: getModifiers({ step, options }),
  });
};

export const updatePopper = ({
  step,
  popper,
  options,
}: {
  step: Step;
  popper: Instance;
  options?: DetourOptions;
}) => {
  const targetElement = getTargetElement({ step });

  if (!targetElement) return;

  popper.state.elements.reference = targetElement;

  popper.setOptions({
    placement: getPlacement({ step, options }),
    modifiers: getModifiers({ step, options }),
  });

  popper.update();
};

export const destroyPopper = ({ popper }: { popper: Instance }) => {
  popper.destroy();
};
