/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        dela: ["var(--font-dela)", "sans-serif"],
      },
      colors: {
        memory: {
          "50": "#f8f9fa",
          "100": "#f1f3f5",
          "200": "#e9ecef",
          "300": "#dee2e6",
          "400": "#ced4da",
          "500": "#adb5bd",
          "600": "#868e96",
          "700": "#495057",
          "800": "#343a40",
          "900": "#212529",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
