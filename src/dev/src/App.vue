<template>
  <header class="h-20 bg-gray-200 w-full">
    <div class="h-full max-w-4xl w-full px-4 mx-auto flex items-center">
      <h1 id="step-1" class="text-xl">Vue Detour</h1>

      <div class="ml-auto flex gap-x-4">
        <button
          class="bg-green-300 hover:bg-green-400 transition-colors text-green-900 rounded-lg px-2.5 py-1.5"
          @click="start"
        >
          Start Detour
        </button>

        <button
          class="bg-yellow-300 hover:bg-yellow-400 transition-colors text-yellow-900 rounded-lg px-2.5 py-1.5"
          @click="hide"
        >
          Hide Detour
        </button>

        <button
          class="bg-red-300 hover:bg-red-400 transition-colors text-red-900 rounded-lg px-2.5 py-1.5"
          @click="finish"
        >
          End Detour
        </button>
      </div>
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

  <div
    id="tooltip"
    class="p-3 flex flex-col shadow-md max-w-xs transition-opacity bg-blue-600 rounded-lg text-white"
  >
    <slot name="arrow">
      <div data-popper-arrow></div>
    </slot>

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
  </div>
</template>

<script lang="ts" setup>
import { useDetour } from "@/lib/composables/detour";

const {
  isFirstStep,
  isLastStep,
  currentStep,
  start,
  hide,
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
    scrollToTopOnFinish: true,
    startImmediately: true,
    persistence: {
      type: "local",
      key: "home",
      version: "0.0.1",
    },
  },
});
</script>

<style scoped>
#tooltip div[data-popper-arrow],
#tooltip div[data-popper-arrow]::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#tooltip div[data-popper-arrow] {
  visibility: hidden;
}

#tooltip div[data-popper-arrow]::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^="top"] > div[data-popper-arrow] {
  bottom: -4px;
}

#tooltip[data-popper-placement^="bottom"] > div[data-popper-arrow] {
  top: -4px;
}

#tooltip[data-popper-placement^="left"] > div[data-popper-arrow] {
  right: -4px;
}

#tooltip[data-popper-placement^="right"] > div[data-popper-arrow] {
  left: -4px;
}
</style>
