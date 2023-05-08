import { defineConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    proxy: {
      "/screenshot": {
        target: "https://jaam-toast-screenshot.vercel.app/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/screenshot/, ""),
      },
    },
  },
  resolve: {
    alias: [{ find: "@jaam-schema", replacement: "/packages/jaam-schema" }],
  },
  define: {
    global: {},
  },
});
