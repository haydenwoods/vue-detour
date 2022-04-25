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
  <div id="step-2"></div>

  <!-- Tooltip -->
  <div id="tooltip"></div>
</template>

<script>
import { useDetour } from "vue-detour";

const detour = useDetour({
  tooltip: "step-1",
  steps: [
    {
      target: "#step-1",
    },
    {
      target: "#step-2",
      placement: "top-end", // Optional placement
      offset: [0, 24], // Optional offset for
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
