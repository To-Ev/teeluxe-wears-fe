import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/teeluxe-wears-fe/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom'],
          uiVendor: ['react-icons'],
          reduxVendor: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
})


// git remote -v 
// git remote set-url origin  https://github.com/To-Ev/teeluxe-wears-be.git