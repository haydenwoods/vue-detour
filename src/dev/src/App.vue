<template>
  <header class="h-20 bg-gray-200 w-full">
    <div class="h-full max-w-4xl w-full px-4 mx-auto flex items-center">
      <h1 id="step-1" class="text-xl">vue-detour</h1>
    </div>
  </header>

  <main class="max-w-4xl w-full mx-auto px-4 pt-10">
    <div class="flex gap-x-8">
      <div
        id="step-2"
        class="bg-purple-200 text-purple-800 w-1/3 rounded-2xl p-8"
      >
        <h2 class="text-2xl font-semibold">Item one</h2>
        <p class="pt-3 text-lg">
          This is an example item that the user would be directed to when they
          first <span id="step-3" class="font-bold">view</span> the page.
        </p>
      </div>

      <div class="bg-green-200 text-green-800 w-1/3 rounded-2xl p-8">
        <h2 class="text-xl font-semibold">Item two</h2>
        <p class="pt-3 text-lg">
          This is another example item that the user would be directed to when
          they first view the page. Maybe this one is longer than the others?
        </p>
      </div>

      <div class="bg-blue-200 text-blue-800 w-1/3 rounded-2xl p-8">
        <h2 class="text-xl font-semibold">Item three</h2>
        <p class="pt-3 text-lg">
          This is another example item that the user would be directed to when
          they first view the page.
        </p>
      </div>
    </div>
  </main>

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
import { useDetour } from "@/lib/composables/detour";

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
} = useDetour({
  tooltip: "#tooltip",
  steps: [
    {
      target: "#step-1",
      props: {
        content: "This is the header",
      },
    },
    {
      target: "#step-2",
      props: {
        content: "This is a highlighted content box",
      },
    },
    {
      target: "#step-3",
      placement: "bottom",
      props: {
        content: "You could even highlight a specific word",
      },
    },
  ],
  options: {
    returnToTopOnFinish: true,
    startOnMount: true,
  },
});
</script>
