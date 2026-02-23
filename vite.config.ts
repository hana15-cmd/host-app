import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: "host_app",
      remotes: {
        remote_app: "http://localhost:5001/assets/remoteEntry.js",
        mfe_accounting_app: "http://localhost:5002/assets/remoteEntry.js",
        user_management_app: "http://localhost:5004/assets/remoteEntry.js",
       },
      shared: {
        react: {
          requiredVersion: "^19.2.0",
        },
        "react-dom": {
          requiredVersion: "^19.2.0",
        },
        "react-router-dom": {
          requiredVersion: "^7.0.0",
        },
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
  server: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
});