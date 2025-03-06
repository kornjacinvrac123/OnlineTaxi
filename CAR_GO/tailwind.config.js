/** @type {import('tailwindcss').Config} */


const plugin = require('tailwindcss/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up':{
          '0%' :{transform: 'translateX(-20%)',opacity:'0.5' },
          '50%':{transform: 'translateY(0)',opacity:'1'},
        },
        'slide-down':{
          '0%' :{transform: 'translateY(-30%)',opacity:'0.3' },
          '60%':{transform: 'translateY(0)',opacity:'1'},
        },
        'slide-right':{
          '0%' :{transform: 'translateX(-100%)',opacity:'0',},
          '100%':{transform: 'translateX(0)',opacity:'1',},
        },
       'slide-left': {
          '0%': { 
            transform: 'translateX(100%)', 
            opacity: '0',
            position: 'absolute',
            right: '0'
          },
          '100%': {
            transform: 'translateX(0)', 
            opacity: '1',
            position: 'absolute',
            right: '0'
          },
        }

      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        'slide-up' : 'slide-up 1.5s ease-out forwards',
        'slide-down' : 'slide-down 2.0s ease-out forwards',
        'slide-right' : 'slide-right 1.5s ease-out forwards ',
        'slide-left' : 'slide-left 1.5s ease-out forwards',
         
      },
      transitionDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
      },
    },
  },
  plugins: [  
    plugin(function({ addUtilities }) {
    addUtilities({
      '.animation-delay-100': {
        'animation-delay': '100ms',
      },
      '.animation-delay-200': {
        'animation-delay': '200ms',
      },
      '.animation-delay-300': {
        'animation-delay': '300ms',
      },
      '.animation-delay-400': {
        'animation-delay': '400ms',
      },
      '.animation-delay-600': {
        'animation-delay': '600ms',
      },
    });
  }),
],
}