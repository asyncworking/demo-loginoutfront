import React from 'react';
import {
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import welcome from 'src/assets/svgs/welcome.svg';
import logo from '../../assets/svgs/logoWithoutTexts.svg';
import LoginForm from './components/LoginForm/LoginForm';
import useStyles from './Login.style';
import Footer from '../Footer/Footer';

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        className={classes.background}
      >
        <Grid item className={classes.form}>
          <img src={logo} className="img" alt="logo" />
          <Typography className={classes.title}>
            Log in to Async Working
          </Typography>
          <LoginForm />
          <Footer isLoginPage />
        </Grid>
        <Hidden smDown>
          <Grid item>
            <img src={welcome} alt="welcome" className={classes.img} />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};
export default Login;
