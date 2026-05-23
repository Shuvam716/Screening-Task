import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'editorial': 'rgba(40, 35, 52, 0.18) 0px 8px 24px 0px',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.editorial-gradient': {
          'background-image': 'linear-gradient(135deg, rgb(40, 35, 52) 0%, rgb(62, 56, 74) 100%)',
          'box-shadow': 'rgba(40, 35, 52, 0.18) 0px 8px 24px 0px',
        },
      }
      addUtilities(newUtilities);
    })
  ],
};
export default config;
