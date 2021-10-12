/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import * as apiUtils from 'src/utils/apiUtils';
import useLoadingTimer from './useLoadingTimer';

const useResend = () => {
  const { onStart, loading, totalSecond } = useLoadingTimer({
    loading: false,
    totalSecond: 60,
  });
  const [opened, setOpen] = useState(false);
  const handleResend = useCallback(() => {
    const email = localStorage.getItem('email');
    apiUtils.resendActivationLink({ email });
    onStart();
    setOpen(true);
  }, []);
  return { handleResend, loading, totalSecond, opened, setOpen };
};

export default useResend;
