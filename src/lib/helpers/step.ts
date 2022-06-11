import { getTargetElement } from "../helpers/popper";

import { Step } from "../types/step";

export const scrollToTop = async () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};

export const scrollToTarget = ({ step }: { step: Step }) => {
  const targetElement = getTargetElement({ step });

  if (!targetElement) {
    throw new Error(
      "Unable to find element to scroll to. Are you sure there is an element with the "
    );
  }

  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
