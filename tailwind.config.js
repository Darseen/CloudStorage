/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1eb854",
          secondary: "#1db990",
          accent: "#1db9ac",
          neutral: "#18342b",
          "base-100": "#171212",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
