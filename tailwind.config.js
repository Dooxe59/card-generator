module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        forge: "#C1440E",
        "forge-light": "#E85D3D",
        commerce: "#D4AF37",
        "commerce-light": "#F4D03F",
        artisanat: "#708090",
        "artisanat-light": "#A9A9A9",
        nature: "#228B22",
        "nature-light": "#32CD32",
        contract: "#003366",
        event: "#6A0DAD",
      },
    },
  },
  plugins: [],
};
