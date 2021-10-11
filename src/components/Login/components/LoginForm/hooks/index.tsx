/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import {
  InputAdornment,
} from '@material-ui/core';
import ILogin from 'src/common/interfaces/ILogin';
import * as apiUtils from 'src/utils/apiUtils';
import * as Yup from 'yup';
import { INTERNAL_SERVER_ERROR, USERNAME_PASSWORD_MISMATCH_ERROR } from 'src/common/constants/ErrorMessages';
import notificationIcon from 'src/assets/svgs/notificationIcon.svg';
import useStyles from '../LoginForm.style';

export const useLoginForm = () => {
  const history = useHistory();
  const [warning, setWarning] = useState({
    shown: false,
    message: '',
  });
  const [resendMessage, setResendMessage] = useState({
    shown: false,
  });
  const initialValues: ILogin = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required('Email Required!').email('Please enter a valid email'),
    password: Yup.string().required('Password Required!'),
  });
  const handleOnSubmit = useCallback(async ({ email, password }: ILogin) => {
    setResendMessage({
      shown: false,
    });
    setWarning({
      shown: false,
      message: '',
    });

    try {
      const loginResponse = await apiUtils.login({ email, password });
      if (loginResponse.status === 200) {
        const token = loginResponse.data.accessToken;
        const statusResponse = await apiUtils.verifyStatus(email, token);

        if (statusResponse.status === 200) {
          localStorage.setItem('accessToken', loginResponse.data.accessToken);
          localStorage.setItem('email', email);
          localStorage.setItem('userId', loginResponse.data.id);
          localStorage.setItem('name', loginResponse.data.name);
          history.push('/dashboard');
        }
        if (statusResponse.status === 203) {
          localStorage.setItem('email', email);
          setResendMessage({
            shown: true,
          });
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 500) {
          setWarning({
            shown: true,
            message: INTERNAL_SERVER_ERROR,
          });
        }
        if (error.response.status === 401) {
          setWarning({
            shown: true,
            message: USERNAME_PASSWORD_MISMATCH_ERROR,
          });
        }
      } else {
        setWarning({
          shown: true,
          message: 'something wrong',
        });
      }
    }
  }, []);
  return { initialValues, validationSchema, handleOnSubmit, warning, resendMessage };
};

export const useExtraFormConf = () => {
  const classes = useStyles();
  const getStartAdornment = useCallback((component: JSX.Element) => ({
    startAdornment: (
      <InputAdornment position="start">
        {component}
      </InputAdornment>
    ),
  }), []);
  const getErrorMsg = useCallback((name: string) => (
    <ErrorMessage name={name}>
      { (msg) => (
        <span className={classes.error}>
          <span className={classes.img}>
            <img src={notificationIcon} alt="notificationIcon" />
          </span>
          <span className={classes.errormessage}>{msg}</span>
        </span>
      )}
    </ErrorMessage>
  ), []);
  return { getStartAdornment, getErrorMsg };
};
