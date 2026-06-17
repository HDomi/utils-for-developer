// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    base: mode === "production" ? "/utils-for-developer/" : "/",
    build: {
      chunkSizeWarningLimit: 3000, // Set the limit to a higher value (in KiB)
      rollupOptions: {
        output: {
          // ...
          manualChunks(id) {
            if (id.includes("vue-color")) {
              return "vue-color";
            }
          },
        },
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/],
      }),
      vuetify({
        autoImport: true,
      }),
    ],
    define: { "process.env": env },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 3000,
    },
  });
};
