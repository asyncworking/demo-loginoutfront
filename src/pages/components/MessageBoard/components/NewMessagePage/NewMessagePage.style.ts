import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mainPaper: {
    top: '-8px',
    boxSizing: 'border-box',
    maxWidth: '53em',
    minHeight: '100vh',
    background: '#fff',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto 10rem',
      padding: '3rem',
    },

    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      borderRadius: '5px',
      padding: '5rem',
    },
  },
}));

export default useStyles;
