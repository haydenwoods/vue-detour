import { getTargetElement } from "@/lib/helpers/popper";
import { sleep } from "@/lib/helpers/general";

import { Step } from "@/lib/types/step";

export const scrollToTop = async () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });

  await sleep(500);
};

export const scrollToTarget = async ({ step }: { step: Step }) => {
  const targetElement = getTargetElement({ step });

  if (!targetElement) return;

  targetElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  await sleep(500);
};
