import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(), // Fast Refresh
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: true, // ensure the browser opens automatically when server starts
  },
});
