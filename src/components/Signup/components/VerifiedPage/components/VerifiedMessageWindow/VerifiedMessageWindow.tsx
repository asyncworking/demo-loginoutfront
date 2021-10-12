import React, { useEffect } from 'react';
import {
  Button,
} from '@material-ui/core';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import * as apiUtils from 'src/utils/apiUtils';
import useStyles from './VerifiedMessageWindow.style';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifiedMessageWindow = () => {
  const classes = useStyles();
  const query = useQuery();
  const verifiedLink = () => {
    const code = query.get('code');
    apiUtils.verifyActiveUser(code);
  };
  useEffect(() => {
    verifiedLink();
  }, []);

  return (
    <div>
      <h3 className={classes.header}>Congratulations!</h3>
      <p className={classes.notification}>
        Your account has been successfully activated and you can login to your account.
      </p>
      <Link className={classes.login_link} to="/login">
        <Button
          type="button"
          variant="contained"
          fullWidth
          className={classes.login_button}
          color="primary"
        >
          Log in now
        </Button>
      </Link>
    </div>
  );
};

export default VerifiedMessageWindow;
