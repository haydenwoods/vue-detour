# Vue Detour

Introduce users to your app by taking them on a detour.

## Getting started

Vue-detour can be installed via NPM.

```
npm install vue-detour
```

## Usage

```html
<template>
  <!-- Steps -->
  <div id="step-1"></div>
  <div id="step-2"></div>

  <!-- Tooltip -->
  <div id="tooltip">
    <button v-if="!detour.isFirstStep" @click="detour.previousStep">
      Previous
    </button>

    <button v-if="!detour.isLastStep" @click="detour.nextStep">
      Next
    </button>

    <button @click="detour.skip">
      {{ detour.isLastStep ? "Finish" : "Skip" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDetour } from "vue-detour";

const detour = useDetour({
  tooltip: "step-1", // CSS query selector string
  steps: [
    {
      target: "#step-1", // CSS query selector string
      placement: "top-end", // Optional placement
      offset: [0, 24], // Optional offset
    },
    {
      target: "#step-2", // CSS query selector string
    },
  ],
  options: {
    defaultPlacement: "auto", // Default placement, overriden by individual step placement
    defaultOffset: [0, 8], // Default offset, overriden by individual step offset
    startImmediately: true, // Start detour immediately
    scrollToTopOnFinish: true, // Scroll to the top of the page on detour finish
  },
});
</script>
```
