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

	console.log("--- VITE DEBUG ---");
	console.log("Looking for .env in:", envDir);
	console.log("VITE_API_URL found:", env.VITE_API_URL);
	console.log("------------------");

	// DIAGNOSTIC LOGS
	console.log("1. Current Directory (__dirname):", __dirname);
	console.log(
		"2. Is VITE_API_URL in the .env file?",
		env.VITE_API_URL ? "YES" : "NO (This is why it is undefined)",
	);
	console.log("3. Env DEFAULT_HOST:", env.DEFAULT_HOST);

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
		envDir: envDir,
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
