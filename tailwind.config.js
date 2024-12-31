/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix:'tw-',
  content: [
      'index.html',
      './node_modules/quasar-crud-yaj/**/*.{vue,js,ts,jsx,tsx}',
      './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
      extend: {}
  },
  plugins: []
}
