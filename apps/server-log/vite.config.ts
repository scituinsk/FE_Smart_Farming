import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router"],
          "vendor-ui": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
          ],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-icons": ["lucide-react"],
          "vendor-form": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-utils": ["axios", "clsx", "tailwind-merge", "class-variance-authority", "nuqs"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
