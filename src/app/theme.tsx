import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins-Regular',
  },
  palette: {
    primary: {
      main: '#7d589f', // '#2ab782',
    },
    secondary: {
      main: '#5f11cb',
    },
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        color: '#f44336',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 374, // phone
      md: 1184, // tablet
      lg: 1440, // desktop
      xl: 1920,
    },
  },
});

export default theme;
