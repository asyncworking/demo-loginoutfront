import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  Dialog,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom';
import resendIcon from 'src/assets/svgs/resendIcon.svg';
import useStyles from './EmailActivationWindow.style';
import useResend from './hooks/useResend';

const EmailActivationWindow = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { handleResend, loading, totalSecond, opened, setOpen } = useResend();
  useEffect(() => {
    if (location.state) {
      if (location.state.path === '/login' || location.state.path === '/') {
        handleResend();
      }
    }
  }, []);

  return (
    <>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={opened}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <div className={classes.dialog_content}>
          <img src={resendIcon} alt="resendIcon" className={classes.img} />
          <Typography align="center" className={classes.text}>
            We have resend a new verification email to your email address.
          </Typography>
        </div>
      </Dialog>
      <h3 className={classes.header}>You are almost there ...</h3>
      <p className={classes.notification_top}>
        We have sent you a verification link to
      </p>
      <div className={classes.notification_email}>
        {localStorage.getItem('email')}
      </div>
      <p className={classes.notification_bottom}>
        Please check your inbox.
        It could take up to 3-5 minutes to show up in your inbox.
      </p>
      <Grid
        container
        justifyContent="space-between"
        alignItems="baseline">
        <Grid item>
          <Button
            className={classes.button_resend}
            onClick={handleResend}
            disabled={loading}
          >
            {loading ? `Resend Email (${totalSecond})` : 'Resend Email'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.button_login}
            onClick={() => { history.push('/login'); }}
          >
            Log in Now
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailActivationWindow;
