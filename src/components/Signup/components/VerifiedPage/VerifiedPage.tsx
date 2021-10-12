import React from 'react';
import {
  Typography,
  Grid,
  Hidden,
} from '@material-ui/core';
import welcome from 'src/assets/svgs/welcome.svg';
import useStyles from './VerifiedPage.style';
import VerifiedMessageWindow from './components/VerifiedMessageWindow/VerifiedMessageWindow';

const VerifiedPage = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.background}
      >
        <Grid item md={5} className={classes.form}>
          <Typography className={classes.title}>
            Welcome to the website
          </Typography>
          <VerifiedMessageWindow />
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

export default VerifiedPage;
