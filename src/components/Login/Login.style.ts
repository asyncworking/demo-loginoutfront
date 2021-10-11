import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  background: {
    height: 'auto',
    minHeight: '100vh',
    background: 'linear-gradient(to left, #faf8fd 50%, #ffffff 50%)',
    [theme.breakpoints.down('sm')]: {
      background: '#ffffff',
    },
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '1.6rem',
    },
  },
  form: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '125px',
      margin: 'auto',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      marginLeft: '75px',
      marginTop: '75px',
      width: '25%',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginLeft: '140px',
      marginTop: '100px',
      width: '25%',
    },
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}));
