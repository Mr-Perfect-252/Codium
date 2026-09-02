import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: { host: "::", port: 5173 },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    outDir: "dist",
    // Do not emit source maps to the deployed bundle. Source maps let tools
    // reconstruct the original source tree (App.tsx, folder names, comments)
    // from production JS. This is already Vite's default, set explicitly here
    // so it can never be turned on by accident. NOTE: client code is never
    // truly secret; this only stops handing out the original files.
    sourcemap: false,
  }
});
