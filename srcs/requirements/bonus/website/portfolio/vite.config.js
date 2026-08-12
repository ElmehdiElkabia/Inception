import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  // base: "/portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/website/',
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "eelkabia.42.fr",
    ],
  },
}));
