import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const envDir = resolve(__dirname, "..");
  const env = loadEnv(mode, envDir, "");
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "index.html"),
      },
      sourcemap: isDev,
    },
    server: {
      host: env.DEFAULT_HOST,
      port: env.VITE_PORT,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
      sourcemap: isDev,
    },
  };
});
