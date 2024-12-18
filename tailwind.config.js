/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,handlebars}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['ABeeZee', 'sans-serif'],
        body: ['Poppins', 'sans-serif']
      },
      colors: {
        dark: {
          'primary': 'rgb(219 198 110)',
          'surface-tint': 'rgb(219 198 110)',
          'on-primary': 'rgb(58 48 0)',
          'primary-container': 'rgb(83 70 0)',
          'on-primary-container': 'rgb(248 226 135)',
          'secondary': 'rgb(209 198 161)',
          'on-secondary': 'rgb(54 48 22)',
          'secondary-container': 'rgb(78 71 42)',
          'on-secondary-container': 'rgb(238 226 188)',
          'tertiary': 'rgb(169 208 179)',
          'on-tertiary': 'rgb(20 55 35)',
          'tertiary-container': 'rgb(44 78 56)',
          'on-tertiary-container': 'rgb(197 236 206)',
          'error': 'rgb(255 180 171)',
          'on-error': 'rgb(105 0 5)',
          'error-container': 'rgb(147 0 10)',
          'on-error-container': 'rgb(255 218 214)',
          'background': 'rgb(21 19 11)',
          'on-background': 'rgb(232 226 212)',
          'surface': 'rgb(21 19 11)',
          'on-surface': 'rgb(232 226 212)',
          'surface-variant': 'rgb(75 71 57)',
          'on-surface-variant': 'rgb(205 198 180)',
          'outline': 'rgb(150 144 128)',
          'outline-variant': 'rgb(75 71 57)',
          'shadow': 'rgb(0 0 0)',
          'scrim': 'rgb(0 0 0)',
          'inverse-surface': 'rgb(232 226 212)',
          'inverse-on-surface': 'rgb(51 48 39)',
          'inverse-primary': 'rgb(109 94 15)',
          'primary-fixed': 'rgb(248 226 135)',
          'on-primary-fixed': 'rgb(34 27 0)',
          'primary-fixed-dim': 'rgb(219 198 110)',
          'on-primary-fixed-variant': 'rgb(83 70 0)',
          'secondary-fixed': 'rgb(238 226 188)',
          'on-secondary-fixed': 'rgb(33 27 4)',
          'secondary-fixed-dim': 'rgb(209 198 161)',
          'on-secondary-fixed-variant': 'rgb(78 71 42)',
          'tertiary-fixed': 'rgb(197 236 206)',
          'on-tertiary-fixed': 'rgb(0 33 15)',
          'tertiary-fixed-dim': 'rgb(169 208 179)',
          'on-tertiary-fixed-variant': 'rgb(44 78 56)',
          'surface-dim': 'rgb(21 19 11)',
          'surface-bright': 'rgb(60 57 48)',
          'surface-container-lowest': 'rgb(16 14 7)',
          'surface-container-low': 'rgb(30 27 19)',
          'surface-container': 'rgb(34 32 23)',
          'surface-container-high': 'rgb(45 42 33)',
          'surface-container-highest': 'rgb(56 53 43)',
        },
        light: {
          'primary': 'rgb(79 66 0)',
          'surface-tint': 'rgb(109 94 15)',
          'on-primary': 'rgb(255 255 255)',
          'primary-container': 'rgb(133 116 37)',
          'on-primary-container': 'rgb(255 255 255)',
          'secondary': 'rgb(74 67 39)',
          'on-secondary': 'rgb(255 255 255)',
          'secondary-container': 'rgb(125 116 85)',
          'on-secondary-container': 'rgb(255 255 255)',
          'tertiary': 'rgb(40 74 52)',
          'on-tertiary': 'rgb(255 255 255)',
          'tertiary-container': 'rgb(89 125 100)',
          'on-tertiary-container': 'rgb(255 255 255)',
          'error': 'rgb(140 0 9)',
          'on-error': 'rgb(255 255 255)',
          'error-container': 'rgb(218 52 46)',
          'on-error-container': 'rgb(255 255 255)',
          'background': 'rgb(255 249 238)',
          'on-background': 'rgb(30 27 19)',
          'surface': 'rgb(255 249 238)',
          'on-surface': 'rgb(30 27 19)',
          'surface-variant': 'rgb(234 226 208)',
          'on-surface-variant': 'rgb(71 67 53)',
          'outline': 'rgb(100 95 80)',
          'outline-variant': 'rgb(128 122 107)',
          'shadow': 'rgb(0 0 0)',
          'scrim': 'rgb(0 0 0)',
          'inverse-surface': 'rgb(51 48 39)',
          'inverse-on-surface': 'rgb(247 240 226)',
          'inverse-primary': 'rgb(219 198 110)',
          'primary-fixed': 'rgb(133 116 37)',
          'on-primary-fixed': 'rgb(255 255 255)',
          'primary-fixed-dim': 'rgb(107 91 12)',
          'on-primary-fixed-variant': 'rgb(255 255 255)',
          'secondary-fixed': 'rgb(125 116 85)',
          'on-secondary-fixed': 'rgb(255 255 255)',
          'secondary-fixed-dim': 'rgb(100 92 62)',
          'on-secondary-fixed-variant': 'rgb(255 255 255)',
          'tertiary-fixed': 'rgb(89 125 100)',
          'on-tertiary-fixed': 'rgb(255 255 255)',
          'tertiary-fixed-dim': 'rgb(65 100 76)',
          'on-tertiary-fixed-variant': 'rgb(255 255 255)',
          'surface-dim': 'rgb(224 217 204)',
          'surface-bright': 'rgb(255 249 238)',
          'surface-container-lowest': 'rgb(255 255 255)',
          'surface-container-low': 'rgb(250 243 229)',
          'surface-container': 'rgb(244 237 223)',
          'surface-container-high': 'rgb(238 232 218)',
          'surface-container-highest': 'rgb(232 226 212)',
        },
      },
    },
  },
  plugins: [],
}

