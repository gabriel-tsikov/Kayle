import { Theme } from '../models/theme.model';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background': 'hsl(263, 9%, 18%)',
    '--on-background': 'hsla(0, 0%, 100%, 0.801)',
    '--background-secondary': 'hsla(0, 29%, 95%, 0.863)',
    '--on-background-secondary': 'hsl(257, 10%, 28%)',
    '--primary': 'hsl(257, 10%, 30%)',
    '--primary-faded': 'hsl(257, 10%, 40%)' ,
    '--on-primary': 'hsla(0, 29%, 95%, 0.90)',
    '--border-primary': 'hsla(0, 0%, 20%, 0.80)',
    '--shadow-primary': 'hsla(0, 0%, 10%, 0.5)',
    '--secondary': 'hsl(261, 56%, 79%)',
    '--on-secondary': 'hsla(0, 0%, 100%, 0.883)',
    '--border-secondary': 'hsla(0, 0%, 20%, 0.80)',
    '--surface': 'hsl(0, 0%, 100%)',
    '--on-surface': 'hsl(0, 0%, 6%)',
    '--error': 'hsla(7, 81%, 60%, 0.911)',
    '--on-error': 'hsl(0, 0%, 100%, 0.8)',
    '--warning': 'hsl(40, 91%, 61%)',
    '--on-warning': 'hsl(0, 0%, 100%, 0.8)',
    '--success': 'hsla(112, 40%, 56%, 0.811)',
    '--on-success': 'hsla(0, 0%, 100%, 0.8)',
    '--disabled': 'hsla(0, 0%, 80%, 0.60)',
    '--hover': 'hsla(0, 0%, 13%, 0.96)',
    // used for moon
    '--purple': 'hsl(263, 29%, 30%)',
    '--white': 'hsla(0, 0%, 100%, 0.80)',
    '--glow': 'hsla(251, 54%, 92%, 0.8)',
    '--filter-icon': 'invert(96%) sepia(4%) saturate(15%) hue-rotate(131deg) brightness(104%) contrast(103%)',
  },
};
