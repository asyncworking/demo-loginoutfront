import React from 'react';
import {
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import welcome from 'src/assets/svgs/welcome.svg';
import useStyles from './EmailActivationPage.style';
import EmailActivationWindow from './components/EmailActivationWindow/EmailActivationWindow';

const EmailActivationPage = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        className={classes.background}
      >
        <Grid item md={5} className={classes.form}>
          <Typography className={classes.title}>
            Welcome to the website
          </Typography>
          <EmailActivationWindow />
        </Grid>
        <Hidden smDown>
          <Grid item md={7} container className={classes.img_container}>
            <img src={welcome} alt="welcome" className={classes.img} />
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};
export default EmailActivationPage;
