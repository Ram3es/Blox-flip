/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/*.*',
    './css/styles.css',
    './*.*',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkNode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      },
      fontSize: {
        10: '0.625rem', //10px
        11: '0.6875rem', //11px
        13: '0.8125rem', //13px
        15: '0.9375rem', //15px
        17: '1.0625rem', //17px
        22: '1.375rem', //22px
        26: '1.625rem' //26px
      },
      opacity: {
        15: '0.15'
      },
      colors: {
        dark: 'rgba(0, 0, 0)',
        'blue-darken': 'rgba(13, 16, 32)',
        'blue-primary': 'rgba(29, 33, 53)',
        'blue-primary-secondary': 'rgba(29, 35, 62)',
        'blue-primary-darken': 'rgba(31, 36, 56)',
        'blue-secondary': 'rgba(36, 42, 66)',
        'blue-third': 'rgba(60, 69, 107)',
        'blue-fourth': 'rgba(84, 97, 150)',
        'blue-accent': 'rgba(41, 48, 77)',
        'blue-accent-primary': 'rgba(42, 53, 100)',
        'blue-accent-secondary': 'rgba(47, 54, 86)',
        'blue-accent-third': 'rgba(33, 40, 65, 1)',
        'blue-accent-fourth': 'rgba(52, 61, 97, 1)',
        'blue-accent-five': 'rgba(79, 89, 136, 1)',
        'blue-accent-six': 'rgba(45, 56, 106)',
        'blue-highlight': 'rgba(54, 62, 96)',
        'blue-highlight-secondary': 'rgba(47, 55, 95)',
        // 'blue-highlight-secondary': 'rgba(12, 15, 31)',
        'blue-light': 'rgba(72, 81, 120)',
        'blue-ocean': 'rgba(82, 95, 151)',
        'blue-ocean-secondary': 'rgba(90, 103, 163)',
        'blue-ocean-third': 'rgba(120, 134, 199)',
        'blue-light-primary': 'rgba(98, 111, 168)',
        'blue-light-secondary': 'rgba(108, 123, 188)',
        'blue-golf': 'rgba(71, 100, 214)',
        'gray-accent': 'rgba(135, 141, 169)',
        'gray-primary': 'rgba(147, 155, 185)',
        'gray-secondary': 'rgba(116, 123, 151)',
        'gray-secondary-light': 'rgba(118, 130, 177)',
        'gray-secondary-darken': 'rgba(89, 97, 129)',
        'lightblue-darken': 'rgba(45, 56, 106)',
        'lightblue-primary': 'rgba(41, 199, 249)',
        'lightblue-primary-secondary': 'rgba(92, 160, 223, 1)',
        'lightblue-primary-darken': 'rgba(69, 177, 255)',
        'lightblue-secondary-darken': 'rgba(69, 76, 107)',
        'lightblue-secondary': 'rgba(71, 100, 214)',
        'lightblue-accent': 'rgba(141, 211, 240, 1)',
        'lightblue-wave': 'rgba(35, 123, 255)',
        'sky-primary': 'rgba(82, 154, 221)',
        'green-primary': 'rgba(44, 221, 104)',
        'green-primary-light': 'rgba(82, 221, 121)',
        'green-secondary': 'rgba(0, 224, 76)',
        'green-third': 'rgba(33, 64, 73)',
        'green-accent': 'rgba(21, 94, 46)',
        'green-accent-secondary': 'rgba(30, 222, 95)',
        'green-highlight': 'rgba(37, 246, 146)',
        'pink-primary-darken': 'rgba(173, 0, 255, 1)',
        'pink-primary': 'rgba(186, 102, 226)',
        'pink-secondary': 'rgba(188, 84, 252, 1)',
        'pink-third': 'rgba(238, 62, 168, 1)',
        'pink-accent': 'rgba(210, 137, 255)',
        'orange-primary': 'rgba(245, 128, 17)',
        'orange-primary-light': 'rgba(255, 153, 0)',
        'orange-secondary': 'rgba(226, 162, 102)',
        'orange-accent': 'rgba(255, 169, 89)',
        'orange-light': 'rgba(206, 96, 71)',
        'yellow-primary': 'rgba(255, 203, 69)',
        'yellow-secondary': 'rgba(229, 173, 78)',
        'yellow-primary': 'rgba(255, 203, 69, 1)',
        'yellow-primary-accent': 'rgba(255, 170, 0)',
        'red-primary': 'rgba(255, 63, 63)',
        'red-secondary': 'rgba(255, 77, 77)',
        'red-accent': 'rgba(239, 94, 94)',
        'red-light': 'rgba(221, 82, 82)',
        'red-light-secondary': 'rgba(223, 59, 59)',
        'border-gray': 'rgba(152, 152, 152)'
      },
      gridTemplateColumns: {
        '5-auto': 'repeat(5, auto)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(96.03% 96.03% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-80': 'radial-gradient(80.03% 80.03% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-60': 'radial-gradient(60.03% 60.03% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-lvl': 'radial-gradient(83.82% 83.82% at 50% 91.09%, var(--tw-gradient-stops))'
      },
      margin: {
        18: '4.5rem' //72
      },
      zIndex: {
        100: '100'
      },
      padding: {
        84: '21rem', //336px
        78: '19.5rem',
        '40%': '40%', //312px
        '60%': '60%', //312px
        full: '100%'
      },
      borderRadius: {
        DEFAULT: '0.3125rem',
        10: '0.625rem',
        15: '0.9375rem'
      },
      boxShadow: {
        'green-15': '0 0 15px rgba(75, 251, 134, 0.35)',
        'green-primary-10': '0 0 10px rgba(44, 221, 104)',
        'green-20': '0 0 20px rgba(75, 251, 134, 0.35)',
        'dark-15': '0px 2px 10px rgba(0, 0, 0, 0.15)',
        'orange-10': '0px 0px 10px #FF9900'
      },
      outlineWidth: {
        3: '0.1875rem' //3px
      },
      width: {
        15: '3.75rem',
        18: '4.5rem', //72px
        21: '5.25rem', //84px
        '1/7': '14.28%',
        '1/8': '11.11%',
        '1/9': '11.11%'
      },
      height: {
        17: '4.25rem', //68
        18: '4.5rem' //72px
      },
      screens: {
        xxxs: '390px',
        xxs: '480px',
        xm: '600px',
        xs: '768px',
        sm: '992px',
        md: '1200px',
        ls: '1400px',
        lg: '1600px',
        '3xl': '1800px'
      },
      maxWidth: {
        1190: '1190px',
        1470: '1470px'
      },
      minWidth: {
        '3xl': '768px',
        sm: '1200px'
      },

      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2.4)',
            opacity: 0
          }
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded']
  }
}
