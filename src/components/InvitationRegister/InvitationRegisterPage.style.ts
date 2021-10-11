import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles, createMuiTheme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  titlebanner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titlebanner__title: {
    color: '#002649',
    fontWeight: 'bolder',
  },
  link: {
    marginTop: '10px',
    fontSize: '20px',
  },
  grid: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: 400,
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
}));

export const themePalette = createMuiTheme({
  palette: {
    primary: {
      main: '#2ab782',
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
});
