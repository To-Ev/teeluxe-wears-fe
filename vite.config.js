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
  // base: '/frontend-upload/'
})



// {plugin: [
//    react(), 
//    tailwindcss({ 
//     theme: { 
//       extend: { 
//         colors: { 
//           brand: { light: '#3ab7ff', DEFAULT: '#0077cc', dark: '#004a80', }, 
//         }, 
//         fontFamily: { 
//           sans: ['Inter', 'system-ui', 'sans-serif'], 
//           heading: ['Poppins', 'sans-serif'], 
//         }, 
//       }, 
//     }, 
//   }), 
// ]}


// <div className="bg-brand text-brand-dark font-heading">
//   Hello with custom Tailwind theme!
// </div>
