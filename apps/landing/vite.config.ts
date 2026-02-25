import { defineConfig } from "vite";
import vinext from "vinext";
import rsc from "@vitejs/plugin-rsc";
import { cloudflare } from "@cloudflare/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    vinext({ rsc: false }),
    rsc({
      entries: {
        rsc: "virtual:vinext-rsc-entry",
        ssr: "virtual:vinext-app-ssr-entry",
        client: "virtual:vinext-app-browser-entry",
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        // vinext 0.0.5: sourcemap chain break on "use client" files (cosmetic, upstream fix pending)
        if (warning.message?.includes("Can't resolve original location of error")) return;
        // vinext: react-dom/server.edge dual static+dynamic import in SSR entry (cosmetic)
        if (
          warning.message?.includes("react-dom") &&
          warning.message?.includes("dynamically imported") &&
          warning.message?.includes("statically imported")
        ) return;
        defaultHandler(warning);
      },
    },
  },
});
