/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./_includes/*.*', './css/styles.css', './*.*', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkNode: 'class',
  theme: {
    extend: {
      fontSize: {
        10: '0.625rem', //10px
        11: '0.6875rem', //11px
        13: '0.8125rem', //13px
        17: '1.0625rem', //17px
        26: '1.625rem' //26px
      },
      opacity: {
        15: '0.15'
      },
      colors: {
        dark: 'rgba(0, 0, 0)',
        'blue-darken': 'rgba(13, 16, 32)',
        'blue-primary': 'rgba(29, 33, 53)',
        'blue-secondary': 'rgba(36, 42, 66)',
        'blue-accent': 'rgba(41, 48, 77)',
        'blue-accent-secondary': 'rgba(47, 54, 86)',
        'blue-highlight': 'rgba(54, 62, 96)',
        'blue-light': 'rgba(72, 81, 120)',
        'blue-light-primary': 'rgba(98, 111, 168)',
        'blue-light-secondary': 'rgba(108, 123, 188)',
        'gray-primary': 'rgba(147, 155, 185)',
        'gray-secondary': 'rgba(116, 123, 151)',
        'gray-secondary-darken': 'rgba(89, 97, 129)',
        'lightblue-darken': 'rgba(45, 56, 106)',
        'lightblue-primary': 'rgba(41, 199, 249)',
        'lightblue-secondary': 'rgba(71, 100, 214)',
        'lightblue-accent': 'rgba(141, 211, 240, 1)',
        'lightblue-wave': 'rgba(35, 123, 255)',
        'sky-primary': 'rgba(82, 154, 221)',
        'green-primary': 'rgba(44, 221, 104)',
        'green-secondary': 'rgba(0, 224, 76)',
        'green-aсcent': 'rgba(21, 94, 46)',
        'green-highlight': 'rgba(37, 246, 146)',
        'pink-primary': 'rgba(186, 102, 226)',
        'pink-secondary': 'rgba(188, 84, 252, 1)',
        'pink-accent': 'rgba(210, 137, 255)',
        'orange-primary': 'rgba(245, 128, 17)',
        'orange-primary-light': 'rgba(255, 153, 0)',
        'orange-secondary': 'rgba(226, 162, 102)',
        'orange-accent': 'rgba(255, 169, 89)',
        'red-primary': 'rgba(255, 63, 63)',
        'red-secondary': 'rgba(255, 77, 77)'
      },
      gridTemplateColumns: {
        '5-auto': 'repeat(5, auto)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(96.03% 96.03% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-80': 'radial-gradient(80.03% 80.03% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial-60': 'radial-gradient(60.03% 60.03% at 50% 50%, var(--tw-gradient-stops))'
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
        18: '4.5rem', //72px
        21: '5.25rem', //84px
        '1/7': '14.28%',
        '1/9': '11.11%'
      },
      height: {
        17: '4.25rem' //68
      },
      screens: {
        xxs: '480px',
        xs: '768px',
        sm: '992px',
        md: '1200px',
        lg: '1600px'
      },
      maxWidth: {
        1190: '1190px',
        1470: '1470px'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded']
  }
}