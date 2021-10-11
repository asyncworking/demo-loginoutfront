import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  cardWrapper: {
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '15px',
    paddingBottom: '15px',
    display: 'flex',
    borderBottom: 'solid 0.01px #e5e5e5',
    color: 'black',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '5%',
    },
  },
  icon: {
    marginRight: '15px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '22px',
    marginBottom: '1px',
  },

  userName: {
    display: 'inline-block',
    color: '#877457',
    fontSize: '15px',
    lineHeight: '21px',
  },
  content: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    color: '#000',
  },
  description: {
    fontSize: '14px',
    display: 'flex',
  },
}));

export default useStyles;
