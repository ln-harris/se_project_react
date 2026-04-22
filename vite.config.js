import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/se_project_react/",
  plugins: [react()],
  server: {
    port: 3000,
  },
}));
