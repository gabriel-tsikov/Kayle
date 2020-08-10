import { Theme } from '../models/theme.model';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': 'hsl(0, 0%, 91%)',
    '--on-background': 'hsla(0, 0%, 6%, 0.80)',
    '--background-secondary': 'hsl(0, 0%, 91%)',
    '--on-background-secondary': 'hsla(0, 0%, 13%, 0.96)',
    '--primary': 'hsl(0, 0%, 98%)',
    '--primary-faded': 'hsl(0, 0%, 100%)',
    '--on-primary': 'hsla(0, 1%, 14%, 0.80)',
    '--border-primary': 'hsla(0, 0%, 80%, 0.80)',
    '--shadow-primary': 'hsla(0, 0%, 80%, 0.80)',
    '--secondary': 'hsl(262, 31%, 41%)',
    '--on-secondary': 'hsla(0, 0%, 100%, 0.80)',
    '--border-secondary': 'rgba(55, 34, 93, 0.6)',
    '--error': 'hsl(7, 81%, 60%)',
    '--on-error': 'hsla(0, 0%, 100%, 0.8)',
    '--warning': 'hsl(40, 91%, 61%)',
    '--on-warning': 'hsla(0, 0%, 100%, 0.8)',
    '--success': 'hsla(118, 63%, 80%, 0.911)',
    '--on-success': 'hsla(0, 0%, 100%, 0.8)',
    '--disabled': 'hsla(0, 0%, 80%, 0.60)',
    '--hover': 'hsl(0, 0%, 80%)',
    // used for sun
    '--purple': 'hsl(263, 29%, 30%)',
    '--white': 'hsla(0, 0%, 100%, 0.96)',
    '--glow': 'hsla(40, 38%, 94%, 0.842)',
    '--filter-icon': 'invert(0%) sepia(93%) saturate(26%) hue-rotate(198deg) brightness(95%) contrast(100%)'
  },
};
