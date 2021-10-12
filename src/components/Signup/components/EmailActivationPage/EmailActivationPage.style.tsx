import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  background: {
    height: 'auto',
    minHeight: '100vh',
    flexWrap: 'nowrap',
    background: 'linear-gradient(to left, #faf8fd 50%, #ffffff 50%)',
    [theme.breakpoints.down('sm')]: {
      background: '#ffffff',
    },
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '1.25rem',
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '1.6rem',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(4),
    },
  },
  form: {
    margin: 'auto',
    height: '650px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '375px',
      padding: theme.spacing(3),
    },
    [theme.breakpoints.between('md', 'xl')]: {
      paddingLeft: '8%',
      paddingRight: '3%',
    },
  },
  img_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    marginLeft: '8.333333%',
  },
}));
