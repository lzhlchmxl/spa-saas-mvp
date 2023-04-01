/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "highlight": "#FAE69E", // light yellow
      "danger": "#ef4444",
      "black": "#000",
      "white": "#EFF3F6",
      "darkGray": "#394251",
      "lightGray": "#343541",
      "borders": "#2C333E", 
      "backgrounds": "#202123", // darker gray
      "lightBackgrounds": "#343541", // blue-ish gray
      "textsIcons":  "#E9EDF2", 
      "shadowsGradients": "#4d4d33", // for shadows and gradients
      "headerFooterText": "#fff",
    },
    extend: {
      width: {
        'contentWidth': '85%', 
        'innerContentContainerWidth': '80%',
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
      },
      margin: {
        'contentPageTopMargin': '105px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
],
}
