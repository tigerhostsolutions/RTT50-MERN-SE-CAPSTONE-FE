import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ejsPlugin from 'vite-plugin-ejs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      ejsPlugin(),
  ],
})
