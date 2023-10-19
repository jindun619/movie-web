import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: ["dark"]
  },
  plugins: [
    require("daisyui"),
    require('tailwindcss-animated')
  ],
}
export default config
