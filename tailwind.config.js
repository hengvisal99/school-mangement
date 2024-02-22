/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#007bff',
        'primary-200': '#abc9fb',
        'primary-600': '#068fff',
        'primary-700': '#085ec5',
        'primary-800': '#0968dc',
      },
      screens: {
        // 'sm': '400px',
        // => @media (min-width: 640px) { ... }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

