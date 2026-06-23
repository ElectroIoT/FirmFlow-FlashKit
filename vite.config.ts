import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// When building for GitHub Pages, assets must be relative to the repo sub-path.
// TAURI_PLATFORM is set during tauri build; absent means we're doing a plain web build.
const isWeb = !process.env.TAURI_PLATFORM;

export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],
  base: isWeb ? "/FirmFlow-FlashKit/" : "/",
  build: isWeb ? {
    rollupOptions: {
      external: [
        /^@tauri-apps\/.*/,
      ],
    },
  } : {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? { protocol: "ws", host, port: 1421 }
      : undefined,
    watch: { ignored: ["**/src-tauri/**"] },
  },
}));
