import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  selector_btn: {
    color: '#1b6ac9',
    textDecoration: 'underline',
    border: '0',
    fontSize: '16px',
    background: 'none',
    cursor: 'pointer',
  },
  notification__display: {
    marginTop: '0.5rem',
  },
  user_profile_icon: {
    marginLeft: '0.5rem',
    display: 'inline',
    '&:first-of-type': {
      marginLeft: '0',
    },
  },
}));
