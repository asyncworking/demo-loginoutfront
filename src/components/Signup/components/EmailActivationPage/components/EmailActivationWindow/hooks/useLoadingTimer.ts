/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';

interface ILoadingTimer {
  loading: boolean,
  totalSecond: number,
}

const useLoadingTimer = (initState: ILoadingTimer) => {
  const timeRef = useRef<any>(null);
  const [loading, setLoading] = useState(initState.loading);
  const [totalSecond, setTotalSecond] = useState(initState.totalSecond);
  const countRef = useRef(totalSecond);
  const clear = useCallback(() => {
    clearTimeout(timeRef.current);
    setLoading(false);
    setTotalSecond(initState.totalSecond);
    countRef.current = initState.totalSecond;
  }, []);
  const setTime = useCallback(() => {
    if (countRef.current <= 0) {
      clear();
      return;
    }
    countRef.current -= 1;
    setTotalSecond(countRef.current);

    timeRef.current = setTimeout(() => {
      setTime();
    }, 1000);
  }, []);
  const onStart = useCallback(() => {
    if (loading) return;
    countRef.current = totalSecond;
    setLoading(true);
    setTime();
  }, []);

  useEffect(() => () => {
    clearTimeout(timeRef.current);
  }, []);
  return {
    onStart,
    loading,
    totalSecond,
  };
};

export default useLoadingTimer;
