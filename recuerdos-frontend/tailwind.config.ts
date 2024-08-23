import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#FFCFE5',
          lighter: '#FDDFEC',
          lightest: '#FFF5F7',
        },
        purple: {
          light: '#F4EDFF',
          lighter: '#EBD6FF',
          lightest: '#E6C8FD',
        },
      },
      fontFamily: {
        kanit: ["var(--font-kanit)"]
      }
    },
  },
  plugins: [],
};

export default config;

//https://stackoverflow.com/questions/72610503/how-to-use-tailwindcss-with-material-ui
//https://mui.com/material-ui/integrations/interoperability/#tailwind-css
/*
  corePlugins: {
    preflight: false,
  },
*/