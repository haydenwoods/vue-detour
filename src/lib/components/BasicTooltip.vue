<template>
  <div class="p-3 flex flex-col shadow-md max-w-xs transition-opacity">
    <slot name="arrow">
      <div data-popper-arrow></div>
    </slot>

    <slot />
  </div>
</template>

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
