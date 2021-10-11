/*  eslint-disable max-len */
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './SignupErrorMessage.scss';
import {
  Box,
  Typography,
} from '@material-ui/core';

interface ISignupErrorMessageProps {
  content: string
  active: boolean
  to: string
  hasLink: boolean
  linkContent: string
  activeLink: boolean
}

const SignupErrorMessage = ({ content, active, to, hasLink, linkContent, activeLink }: ISignupErrorMessageProps) => {
  let errorBoxName = 'signupError';

  if (active) {
    errorBoxName += '--active';
  }

  let linkName = 'activeLink';
  // let linkStyle = 'linkStyle';

  if (hasLink) {
    linkName += '--hideLink';
  }

  if (activeLink) {
    linkName += '--active';
  }

  return (
    <Box className={errorBoxName}>
      <Typography>{content}</Typography>
      <Link to={to} className={linkName} style={{ textDecoration: 'underline', color: 'red' }}>
        <Typography>{linkContent}</Typography>
      </Link>
    </Box>
  );
};

export default SignupErrorMessage;
