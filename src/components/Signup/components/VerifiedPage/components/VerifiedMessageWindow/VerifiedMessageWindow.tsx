import React, { useEffect } from 'react';
import {
  Button,
} from '@material-ui/core';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import * as apiUtils from '../../../../../../utils/apiUtils';
import './VerifiedMessageWindow.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifiedMessageWindow = () => {
  const query = useQuery();
  const verifiedLink = async () => {
    const code = query.get('code');
    const verifyResponse = await apiUtils.verifyActiveUser(code);
    if (verifyResponse.status === 200) {
      // eslint-disable-next-line no-console
      console.log('success');
    }
  };
  useEffect(() => {
    verifiedLink();
  });
  return (
    <div>
      <h3>Congratulations! Your account has been successfully activated.</h3>
      <p>
        You can now login your account and start async working!
      </p>
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

export default VerifiedMessageWindow;
