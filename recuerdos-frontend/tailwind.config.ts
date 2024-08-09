import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
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