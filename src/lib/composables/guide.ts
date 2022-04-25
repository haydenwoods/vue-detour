import { computed, onMounted, readonly, ref } from "vue";
import { Instance } from "@popperjs/core";

import {
  destroyPopper,
  updatePopper,
  createPopper,
  hideTooltipElement,
  showTooltipElement,
} from "@/lib/helpers/popper";
import { scrollToTarget, scrollToTop } from "@/lib/helpers/step";

import { GuideParams, GuideStatus } from "@/lib/types/guide";
import { Step } from "@/lib/types/step";

export const useGuide = ({ steps, tooltip, options }: GuideParams) => {
  const popper = ref<Instance>();
  const status = ref<GuideStatus>(GuideStatus.PENDING);
  const currentStepIndex = ref<number>(0);
  const currentStep = ref<Step>();

  const isFirstStep = computed(() => {
    return currentStepIndex.value === 0;
  });

  const isLastStep = computed(() => {
    return currentStepIndex.value === steps.length - 1;
  });

  const goToStep = async ({ index }: { index: number }) => {
    if (index >= steps.length || index < 0) {
      throw new Error("Step index out of range");
    }

    const nextStep = steps[index];

    if (!nextStep) {
      throw new Error("Unable to find next step");
    }

    // Before update currentStep
    hideTooltipElement({ tooltip });
    await nextStep.before?.();
    await scrollToTarget({ step: nextStep });

    currentStepIndex.value = index;
    currentStep.value = nextStep;

    // After update currentStep
    if (popper.value) {
      updatePopper({
        step: nextStep,
        popper: popper.value,
        options,
      });
    } else {
      popper.value = createPopper({
        step: nextStep,
        tooltip,
        options,
      });
    }

    showTooltipElement({ tooltip });
  };

  const start = () => {
    goToStep({ index: 0 });
    status.value = GuideStatus.IN_PROGRESS;
  };

  const finish = async () => {
    if (!popper.value) return;

    hideTooltipElement({ tooltip });

    if (options?.returnToTopOnFinish) {
      await scrollToTop();
    }

    destroyPopper({ popper: popper.value });

    popper.value = undefined;
    currentStep.value = undefined;
    currentStepIndex.value = 0;

    status.value = GuideStatus.FINISHED;
  };

  const nextStep = () => {
    if (currentStepIndex.value === steps.length - 1) {
      finish();
    } else {
      goToStep({ index: currentStepIndex.value + 1 });
    }
  };

  const previousStep = () => {
    goToStep({ index: currentStepIndex.value - 1 });
  };

  onMounted(() => {
    hideTooltipElement({ tooltip });

    if (options?.startOnMount) {
      start();
    }
  });

  return {
    popper: readonly(popper),
    status: readonly(status),
    currentStepIndex: readonly(currentStepIndex),
    currentStep: readonly(currentStep),
    isFirstStep,
    isLastStep,
    start,
    finish,
    nextStep,
    previousStep,
    skip: finish,
  };
};
