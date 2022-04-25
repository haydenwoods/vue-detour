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
  <div id="step-1"></div>

  <!-- Tooltip -->
  <basic-tooltip id="tooltip">
    <button v-if="!detour.isFirstStep" @click="detour.previousStep">
      Previous
    </button>

    <button v-if="!detour.isLastStep" @click="detour.nextStep">
      Next
    </button>

    <button @click="detour.skip">
      {{ detour.isLastStep ? "Finish" : "Skip" }}
    </button>
  </basic-tooltip>
</template>

<script setup lang="ts">
import { useDetour } from "vue-detour";

const detour = useDetour({
  tooltip: "step-1",
  steps: [
    {
      target: "#step-1",
      placement: "top-end", // Optional placement
      offset: [0, 24], // Optional offset
    },
  ],
  options: {
    defaultPlacement: "auto",
    defaultOffset: [0, 8],
    startOnMount: true,
    returnToTopOnFinish: true,
  },
});
</script>
```
