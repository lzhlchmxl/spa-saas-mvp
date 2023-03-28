/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "highlight": "#FAE69E", // light yellow
      "danger": "#ef4444",
      "white": "#EFF3F6",
      "darkGray": "#394251",
      "lightGray": "#343541",
      "borders": "#2C333E", // for borders and accents
      "backgrounds": "#202123", // for backgrounds: 111825
      "textsIcons":  "#E9EDF2", //"#5c3d1e", // for text and icons:
      "shadowsGradients": "#4d4d33", // for shadows and gradients
      "headerFooterText": "#fff",
    },
    extend: {
      width: {
        'contentWidth': '85%', 
        'iconWidth': '16px',
      },
      height: {
        'iconHeight': '16px',
      },
      maxWidth: {
        'maxContentWidth': '1500px', 
      },
      padding: {
        'iconPadding': '10px',
      }
    },
  },
  plugins: [],
}
