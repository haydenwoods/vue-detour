import { Instance, createPopper as _createPopper } from "@popperjs/core";

import { DEFAULT_PLACEMENT, DEFAULT_OFFSET } from "../constants/popper";

import { DetourOptions } from "../types/detour";
import { Step } from "../types/step";

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
  const element = document.querySelector(step.target);

  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Unable to find target element");
  }

  return element;
};

export const getTooltipElement = ({ tooltip }: { tooltip: string }) => {
  const element = document.querySelector(tooltip);

  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Unable to find tooltip element");
  }

  return element;
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
  try {
    const tooltipElement = getTooltipElement({ tooltip });
    const targetElement = getTargetElement({ step });

    return _createPopper(targetElement, tooltipElement, {
      placement: getPlacement({ step, options }),
      modifiers: getModifiers({ step, options }),
    });
  } catch (error) {
    console.error("createPopper: ", error);
  }
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
  try {
    const targetElement = getTargetElement({ step });

    popper.state.elements.reference = targetElement;

    popper.setOptions({
      placement: getPlacement({ step, options }),
      modifiers: getModifiers({ step, options }),
    });

    popper.update();
  } catch (error) {
    console.error("updatePopper: ", error);
  }
};

export const destroyPopper = ({ popper }: { popper: Instance }) => {
  popper.destroy();
};
