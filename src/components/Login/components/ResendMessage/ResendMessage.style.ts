import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  resend: {
    margin: '20px 0',
    padding: '3%',
    borderRadius: '10px',
    border: 'solid 2px #eb5757',
    backgroundColor: '#fcebea',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  resend_message: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textAlign: 'left',
    color: '#2d3748',
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '16px',
    },
  },
  resend_link: {
    fontFamily: 'Poppins-Regular',
    fontSize: '0.875rem',
    fontWeight: 500,
    textAlign: 'left',
    color: '#eb5757',
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '16px',
    },
  },
}));
