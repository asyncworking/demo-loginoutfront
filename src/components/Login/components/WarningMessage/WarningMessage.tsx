import React from 'react';
import { Typography } from '@material-ui/core';
import warningIcon from 'src/assets/svgs/warningIcon.svg';
import useStyles from './WarningMessage.style';

interface IWarningMessageProps {
  content: string;
}

const WarningMessage = ({ content }: IWarningMessageProps) => {
  const classes = useStyles();
  return (
    <div className={classes.warning}>
      <img src={warningIcon} alt="warningIcon" />
      <Typography className={classes.warning_message}>
        {content}
      </Typography>
    </div>
  );
};

export default WarningMessage;
