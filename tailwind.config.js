module.exports = {
  important: true, // Remove when https://github.com/tailwindlabs/tailwindcss-typography/issues/32 has a solution.
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  purge: [
    './template/**/*.njk',
    './lib/**/*.js',
    './lib/**/*.njk'
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          600: '#EC3A6D'
        }
      },  
      backgroundImage: theme => ({
       'hero-pattern': "url('/assets/img/background-grey.svg')"
      }),
      maxWidth: {
        'prose': '65ch'
      },
    }
  }
}