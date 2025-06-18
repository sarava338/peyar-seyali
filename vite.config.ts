import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const envDir = "./.env"; // ✅ Custom .env directory
  const env = loadEnv(mode, envDir); // Load the .env file

  return {
    plugins: [react(), tailwindcss()], // ✅ React plugin
    envDir, // ✅ Tell Vite to look for envs here
    define: {
      // Optional: expose custom constants if needed
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  };
});
