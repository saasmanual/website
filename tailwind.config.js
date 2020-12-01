module.exports = {
  plugins: [require('@tailwindcss/forms')],
  theme: {
    maxWidth: {
      'prose': '75ch'
    },
    extend: {
      colors: {
        pink: {
          600: '#EC3A6D'
        }
      },  
      backgroundImage: theme => ({
       'hero-pattern': "url('/assets/img/background-grey.svg')"
      })
    }
  }
}