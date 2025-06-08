import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({mode}) => {
  const envDir = resolve(__dirname, '..');
  const env = loadEnv(mode, envDir, '');

  return {
    plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
    sourcemap: true,
  },
  server: {
    host: env.DEFAULT_HOST,
    port: env.VITE_PORT,
    proxy: {
      "/api": {
        target: `http://${env.DEFAULT_HOST}:${env.FLASK_PORT}`,
        changeOrigin: true,
      }
    },
    sourcemap: true,
  },
  }
  
});
