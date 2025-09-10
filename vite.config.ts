import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: format => `index.${format}.js`,
      formats: ["cjs", "es"],
      name: "htm-elements"
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames({ names }) {
          return names[0].endsWith(".css")
            ? `styles[extname]`
            : `[name]-[hash][extname]`
        }
      }
    }
  }
})
