import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    ssr: true,
    outDir: 'dist/vite',
    minify: false,
    rollupOptions: {
      input: './src/index.js'
    }
  },
})
