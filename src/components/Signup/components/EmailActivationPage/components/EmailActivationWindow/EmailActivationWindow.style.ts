import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  header: {
    margin: '56px 101px 39px 4px',
    color: '#43256f',
    fontWeight: 600,
    fontFamily: 'Poppins-Regular',
    fontSize: '18px',
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: '18px',
    },
  },
  notification_top: {
    margin: '39px 0 29px 4px',
    fontFamily: 'Poppins-Regular',
    fontSize: '16px',
    fontWeight: 500,
    color: '#4f4f4f',
  },
  notification_email: {
    margin: '29px 88px 25px 4px',
    fontFamily: 'Poppins-Regular',
    fontWeight: 600,
    color: '#333333',
  },
  notification_bottom: {
    margin: '29px 67px 102px 4px',
    fontFamily: 'Poppins-Regular',
    fontWeight: 500,
    fontSize: '16px',
    color: '#4f4f4f',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px',
    },
  },
  button_container: {
    display: 'inline-flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: 'auto',
    },
  },
  button_resend: {
    color: '#43256f',
    textTransform: 'none',
  },
  button_login: {
    textTransform: 'none',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
    width: '50%',
    height: 60,
  },
  dialog_content: {
    marginTop: '8%',
    marginBottom: '5%',
  },
  text: {
    marginLeft: '5%',
    marginRight: '5%',
  },
}));
