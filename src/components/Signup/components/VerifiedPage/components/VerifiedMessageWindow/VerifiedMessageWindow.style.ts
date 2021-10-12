import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  header: {
    margin: '56px 101px 39px 4px',
    color: '#43256f',
    fontWeight: 600,
    fontFamily: 'Poppins-Regular',
    fontSize: '24px',
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '24px',
    },
  },
  notification: {
    margin: '29px 5px 102px 5px',
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: '18px',
    color: '#4f4f4f',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    },
  },
  login_button: {
    textTransform: 'initial',
  },
  login_link: {
    textDecoration: 'none',
  },
}));
