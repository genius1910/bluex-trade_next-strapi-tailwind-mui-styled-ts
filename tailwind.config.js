/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Roboto', 'serif'],
      title: ['lato'],
      button: ['lato'],
      menu: ['Inter', 'sans-serif'],
      btn: ['lato'],
    },
    screens: {
      sm: '425px',
      md: '768px',
      lg: '960px',
    },
    extend: {
      boxShadow: {
        'testimonial-item': '0 2px 20px 0 rgba(0, 21, 73, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#18335e',
        secondary: '#009bd2',
        submenu: '#18335e',
        header: 'var(--header-text)',
      },
      content: {
        bull: 'bull',
      },
    },
  },
  plugins: [],
};
