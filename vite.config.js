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
  base: '/teeluxe-wears-fe/'
})

// git remote -v 
// git remote set-url origin  https://github.com/To-Ev/teeluxe-wears-be.git