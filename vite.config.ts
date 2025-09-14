import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        confetti: resolve(__dirname, "src/confetti.ts"),
        spinner: resolve(__dirname, "src/spinner.ts"),
        toast: resolve(__dirname, "src/toast.ts")
      },
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["cjs", "es"]
    }
  }
})
