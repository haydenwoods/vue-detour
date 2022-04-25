<template>
  <div class="flex gap-x-4">
    <button @click="start">Start</button>
    <button @click="finish">Finish</button>
  </div>

  <div
    id="step-1"
    class="bg-black h-4 w-4 absolute top-[400px] left-[300px] m-8"
  ></div>
  <div
    id="step-2"
    class="bg-black h-4 w-4 absolute top-[1600px] left-[900px] m-8"
  ></div>
  <div
    id="step-3"
    class="bg-black h-4 w-4 absolute top-[600px] left-[200px] m-8"
  ></div>
  <div
    id="step-4"
    class="bg-black h-4 w-4 absolute top-[200px] left-[400px] m-8"
  ></div>
  <div
    id="step-5"
    class="bg-black h-4 w-4 absolute top-[100px] left-[900px] m-8"
  ></div>

  <basic-tooltip id="tooltip" class="bg-blue-600 rounded-lg text-white">
    <div class="flex flex-col">
      <p>
        {{ currentStep?.props.content }}
      </p>

      <div class="flex gap-x-3 pt-3 items-center">
        <button
          v-if="!isFirstStep"
          class="bg-blue-700 rounded-md px-3 py-1"
          @click="previousStep"
        >
          Previous
        </button>

        <button
          v-if="!isLastStep"
          class="bg-blue-700 rounded-md px-3 py-1"
          @click="nextStep"
        >
          Next
        </button>

        <button class="px-2" @click="skip">
          {{ isLastStep ? "Finish" : "Skip" }}
        </button>
      </div>
    </div>
  </basic-tooltip>
</template>

<script lang="ts" setup>
import { useGuide } from "@/lib/composables/guide";

import BasicTooltip from "@/lib/components/BasicTooltip.vue";

const {
  popper,
  isFirstStep,
  isLastStep,
  currentStep,
  start,
  finish,
  nextStep,
  previousStep,
  skip,
} = useGuide({
  tooltip: "#tooltip",
  steps: [
    {
      target: "#step-1",
      placement: "bottom-start",
      props: {
        content: "Step 1",
      },
    },
    {
      target: "#step-2",
      placement: "top-end",
      props: {
        content: "Step 2",
      },
    },
    {
      target: "#step-3",
      props: {
        content:
          "Step 3 asda sdas das dasd asdas das dasd asd asd asd asda sda sd as",
      },
    },
    {
      target: "#step-4",
      props: {
        content: "Step 4",
      },
    },
    {
      target: "#step-5",
      props: {
        content: "Step 5",
      },
    },
  ],
  options: {
    returnToTopOnFinish: true,
  },
});
</script>
