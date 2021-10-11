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
  message_header: {
    display: 'block',
    fontSize: '2em',
    position: 'relative',
  },
  message_title: {
    fontSize: '1em',
    fontStyle: 'normal',
  },
  title: {
    marginTop: '24px',
    marginBottom: '16px',
    wordWrap: 'break-word',
    wordBreak: 'normal',
  },
  message_notes: {
    fontSize: '18px',
    fontStyle: 'normal',
    padding: '10px',
    borderTop: 'solid 0.01px #e5e5e5',
    borderBottom: 'solid 0.01px #e5e5e5',
    display: 'flex',
    flexDirection: 'row',
  },
  postdetails: {
    marginLeft: '8px',
  },
  content: {
    marginTop: '24px',
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
  },
}));

export default useStyles;
