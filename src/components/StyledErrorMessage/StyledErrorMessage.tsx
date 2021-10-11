import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledBox = withStyles({
  root: {
    color: 'red',
  },
})(Box);

const StyledErrorMessage = ({ message, className }: any) => (
  <StyledBox className={className}>
    <Typography>{message}</Typography>
  </StyledBox>
);

export default StyledErrorMessage;
