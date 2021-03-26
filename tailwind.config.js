// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: {
        dark: '#E9E9E9',
        light: '#F8F8FF'
      },
      brown: '#BB9F70',
      blue: {
        dark: '#37B9C6',
        light: '#A6D3D8',
      },
      orange: {
        dark: '#F27151',
        light: '#F79F88',
      },
      green: {
        dark: '#009C91',
        light: '#339496',
      }
    },
    fontSize: {
        'xs': ['.75rem', {lineHeight: '1rem'}],
        'sm': ['.875rem', {lineHeight: '1.25rem'}],
        'tiny': ['.875rem', {lineHeight: '1.5rem'}],
        'base': ['1rem', {lineHeight: '1.75rem'}],
        'lg': ['1.125rem', {lineHeight: '1.75rem'}],
        'xl': ['1.5rem', {lineHeight: '1.75rem'}],
        '2xl': ['2rem', {lineHeight: '2.25rem'}],
        '3xl': ['3rem', {lineHeight: '3.5rem'}],
        '4xl': ['4rem', {lineHeight: '4.5rem'}],
        '5xl': ['5rem', {lineHeight: '5.5rem'}],
        '6xl': ['6rem', {lineHeight: '6.5rem'}],
        '7xl': ['7rem', {lineHeight: '7.5rem'}],
        '8xl': ['8rem', {lineHeight: '8.5rem'}],
        '9xl': ['9rem', {lineHeight: '9.5rem'}]
            }
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
}