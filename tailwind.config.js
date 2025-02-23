/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        'very-big': '21rem'
      },
      colors: {
        background: 'var(--black)',
        foreground: 'var(--white)'
      },
      fontFamily: {
        patriot: ['departure', 'sans-serif']
      }
    }
  },
  plugins: []
};
