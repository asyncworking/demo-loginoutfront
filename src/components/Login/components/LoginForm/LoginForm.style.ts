import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  forget_link: {
    fontSize: '0.875rem',
    textAlign: 'left',
    color: '#4d296f',
  },
  signup_link: {
    fontFamily: 'Poppins-Medium',
    fontSize: '0.875rem',
    textAlign: 'left',
    color: '#4d296f',
    fontWeight: 550,
  },
  account: {
    fontFamily: 'Poppins-Medium',
    fontSize: '0.875rem',
    textAlign: 'left',
    color: '#828282',
    fontWeight: 550,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: '0.875rem',
    color: '#2d3748',
    fontWeight: 500,
  },
  error: {
    display: 'block',
  },
  img: {
    display: 'inline',
    float: 'left',
  },
  errormessage: {
    fontFamily: 'Poppins-SemiBold',
    color: '#eb5757',
    fontWeight: 600,
    fontSize: '0.875rem',
    marginLeft: '8px',
    display: 'inline',
  },
  login_button: {
    textTransform: 'initial',
  },
}));
