/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core';
import * as apiUtils from '../../../../utils/apiUtils';
import useStyles from './ResendMessage.style';

const ResendMessage = () => {
  const classes = useStyles();
  const [verificationMessage, setVerificationMessage] = useState({
    shown: false,
    message: '',
  });
  const handleResend = async () => {
    const email = localStorage.getItem('email');
    const resendResponse = await apiUtils.resendActivationLink({
      email,
    });
    if (resendResponse.status === 200) {
      setVerificationMessage({
        shown: true,
        message: 'activated!',
      });
    }
  };
  return (
    <div className={classes.resend}>
      <Typography className={classes.resend_message}>Please activate your account.</Typography>
      <Link
        component="button"
        onClick={handleResend}
        className={classes.resend_link}
      >
        Click here to resend verification email
      </Link>
      <Typography>{verificationMessage.message}</Typography>
    </div>
  );
};

export default ResendMessage;
