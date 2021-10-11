import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import './FirstLoginErrorMessage.scss';

interface WarningProps {
  content: string
}

const FirstLoginErrorMessage = ({ content }: WarningProps) => (
  <Box className="firstLoginWarning">
    <Typography className="firstLoginWarningContent">{content}</Typography>
  </Box>
);

export default FirstLoginErrorMessage;
