import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss({
      theme: { 
        extend: { 
          colors: { 
            rabbit: "#ea2e0e",
          },
          fontFamily: { 
            heading: ['Poppins', 'sans-serif'], 
          },
        },
      },
    }),
  ],
  build: {
    // raise the warning threshold if you want
    chunkSizeWarningLimit: 1000, // kB

    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom'],
          uiVendor: ['react-icons', 'boxicons'],
          reduxVendor: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  base: '/teeluxe-wears-fe/'
})

// git remote -v 
// git remote set-url origin  https://github.com/To-Ev/teeluxe-wears-be.git