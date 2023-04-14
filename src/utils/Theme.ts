import {extendTheme} from 'native-base';

const appTheme = extendTheme({
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a', // primary display
      700: '#15803d',
      800: '#166534', // button hover
      900: '#14532d',
    },
  },
});

export default appTheme;
