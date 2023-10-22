// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // width: {
      //   'offset': 'calc(100% - 32px)',
      // },
      colors: {
        primary: "#2563eb",
      },
      fontSize: {
        '5xl': '42px',
        // '4xl': '35px',
        // 'md': '15px'
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1200px",
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

