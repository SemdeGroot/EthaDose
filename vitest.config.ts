import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  // Pure-logic tests do not need CSS processing; inline an empty PostCSS
  // config so Vite does not try to load the Tailwind v4 postcss.config.mjs.
  css: {
    postcss: {},
  },
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
