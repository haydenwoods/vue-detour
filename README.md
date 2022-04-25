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
    <button v-if="!isFirstStep" @click="previousStep">
      Previous
    </button>

    <button v-if="!isLastStep" @click="nextStep">
      Next
    </button>

    <button @click="skip">
      {{ isLastStep ? "Finish" : "Skip" }}
    </button>
  </basic-tooltip>
</template>

<script setup lang="ts">
import { useDetour } from "vue-detour";

const { 
  isFirstStep, 
  isLastStep, 
  nextStep, 
  previousStep, 
  skip 
} = useDetour({
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
})
</script>
```
