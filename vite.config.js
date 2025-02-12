import { defineConfig } from 'vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
  // Remove the build.rollupOptions section completely
})