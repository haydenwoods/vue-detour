import { createApp } from "vue";

import App from "@/dev/src/App.vue";

import "@/dev/src/styles/tailwind.css";

const VueApp = createApp(App);

VueApp.mount("#app");
