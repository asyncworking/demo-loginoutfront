import React from 'react';
import { Box, Typography } from '@material-ui/core';
import IInvitationErrorMessageProps from 'src/common/interfaces/IInvitationErrorMessageProps';
import useStyles from './InvitationErrorMessage.style';

const InvitationErrorMessage = ({ content, active }: IInvitationErrorMessageProps) => {
  const classes = useStyles();
  const errorMessage = active ? classes.error__invitation__active : classes.error__invitation;

  return (
    <Box className={errorMessage}>
      <Typography>{content}</Typography>
    </Box>
  );
};

export default InvitationErrorMessage;
