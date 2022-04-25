import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  root: "src/dev",
  server: {
    port: 3000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "../../dist",
    lib: {
      entry: path.resolve(__dirname, "./src/lib/index.ts"),
      name: "vue-detour",
      fileName: (format) => `vue-detour.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
