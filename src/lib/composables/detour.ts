import { computed, nextTick, onMounted, readonly, ref } from "vue";
import { Instance } from "@popperjs/core";

import {
  DetourOptions,
  DetourPersistence,
  DetourStatus,
} from "../types/detour";
import { DetourStep } from "../types/step";

import { destroyPopper, updatePopper, createPopper } from "../helpers/popper";
import { scrollToTarget, scrollToTop } from "../helpers/step";
import { persistenceRead, persistenceWrite } from "../helpers/persistence";

export const useDetour = <StepProps>({
  steps,
  tooltip,
  options,
}: {
  steps: DetourStep<StepProps>[];
  tooltip: string;
  options?: DetourOptions;
}) => {
  const popper = ref<Instance>();
  const status = ref<DetourStatus>(DetourStatus.PENDING);
  const currentStepIndex = ref<number>(0);
  const currentStep = ref<DetourStep>();
  const hidden = ref<boolean>(false);

  const isFirstStep = computed(() => {
    return currentStepIndex.value === 0;
  });

  const isLastStep = computed(() => {
    return currentStepIndex.value === steps.length - 1;
  });

  const isHidden = computed(() => {
    return hidden.value || status.value !== DetourStatus.IN_PROGRESS;
  });

  const persist = () => {
    if (options?.persistence) {
      persistenceWrite({
        status: status.value,
        stepIndex: currentStepIndex.value,
        options: options.persistence,
      });
    }
  };

  const restore = ({ persistence }: { persistence: DetourPersistence }) => {
    status.value = persistence.status;

    if (status.value === DetourStatus.IN_PROGRESS) {
      goToStep({ index: persistence.stepIndex ?? 0 });
    }
  };

  const goToStep = async ({ index }: { index: number }) => {
    if (index >= steps.length || index < 0) {
      throw new Error("Step index out of range");
    }

    const nextStep = steps[index];

    if (!nextStep) {
      throw new Error("Unable to find next step");
    }

    // Before update currentStep
    await nextStep.before?.();
    scrollToTarget({ step: nextStep });

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

    persist();
  };

  const start = () => {
    status.value = DetourStatus.IN_PROGRESS;
    hidden.value = false;

    nextTick(() => {
      goToStep({ index: 0 });
    });

    persist();
  };

  const hide = async () => {
    if (!popper.value) {
      return console.warn(
        "Unable to hide detour as there is no defined popper."
      );
    }

    if (status.value !== DetourStatus.IN_PROGRESS) {
      return console.warn("Unable to hide detour as it is not IN_PROGRESS.");
    }

    if (options?.scrollToTopOnFinish) {
      await scrollToTop();
    }

    destroyPopper({ popper: popper.value });

    popper.value = undefined;
    hidden.value = true;

    persist();
  };

  const finish = async () => {
    if (!popper.value) {
      return console.warn(
        "Unable to finish detour as there is no defined popper."
      );
    }

    if (status.value !== DetourStatus.IN_PROGRESS) {
      return console.warn("Unable to finish detour as it is not IN_PROGRESS.");
    }

    if (options?.scrollToTopOnFinish) {
      await scrollToTop();
    }

    destroyPopper({ popper: popper.value });

    popper.value = undefined;
    currentStep.value = undefined;
    currentStepIndex.value = 0;

    status.value = DetourStatus.FINISHED;

    persist();
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
    if (options?.persistence) {
      const persistence = persistenceRead({ options: options.persistence });

      if (persistence) {
        restore({ persistence });
      } else {
        persist();

        if (options?.startImmediately) {
          start();
        }
      }
    }
  });

  return {
    status: readonly(status),
    currentStepIndex: readonly(currentStepIndex),
    currentStep: readonly(currentStep),
    isFirstStep,
    isLastStep,
    isHidden,
    start,
    hide,
    finish,
    nextStep,
    previousStep,
    skip: finish,
  };
};
