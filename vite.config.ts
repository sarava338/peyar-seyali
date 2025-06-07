import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const envDir = "./.env"; // ✅ Custom .env directory
  const env = loadEnv(mode, envDir); // Load the .env file

  return {
    plugins: [react()], // ✅ React plugin
    envDir, // ✅ Tell Vite to look for envs here
    define: {
      // Optional: expose custom constants if needed
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  };
});
