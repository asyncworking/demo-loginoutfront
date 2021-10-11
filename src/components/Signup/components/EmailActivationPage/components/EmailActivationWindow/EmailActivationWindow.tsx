import React, { useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';
import * as apiUtils from 'src/utils/apiUtils';
import { RESEND_EMAIL_INFO, INTERNAL_SERVER_ERROR } from 'src/common/constants/ErrorMessages';
import ResendMessage from '../ResendMessage/ResendMessage';
import './EmailActivationWindow.scss';

const EmailActivationWindow = () => {
  const [resendMsg, setResendMsg] = useState({
    shown: false,
    message: '',
  });

  const handleResend = async () => {
    setResendMsg({
      shown: true,
      message: RESEND_EMAIL_INFO,
    });
    const email = localStorage.getItem('email');
    try {
      const resendActivationLinkResponse = await apiUtils.resendActivationLink({ email });
      if (resendActivationLinkResponse.status === 200) {
        setResendMsg({
          shown: true,
          message: RESEND_EMAIL_INFO,
        });
      }
    } catch (error) {
      if (error.status >= 500) {
        setResendMsg({
          shown: true,
          message: INTERNAL_SERVER_ERROR,
        });
      }
      if (error.status >= 400 && error.status < 500) {
        setResendMsg({
          shown: true,
          message: 'Something is wrong with your email address.',
        });
      }
    }
  };
  return (
    <div>
      {resendMsg.shown ? <ResendMessage content={resendMsg.message} /> : null}
      <h3>You are almost there ...</h3>
      <p>
        We have sent you a link to confirm your email address.
        Please check your inbox.
        It could take up to 10 minutes to show up in your inbox.
      </p>
      <div className="resend__container">
        <Button className="link" onClick={handleResend}>Resend Email</Button>
      </div>
      <Link to="/login">
        <Button
          type="button"
          variant="contained"
          fullWidth
          color="primary"
        >
          Sign In Now
        </Button>
      </Link>
    </div>
  );
};

export default EmailActivationWindow;
