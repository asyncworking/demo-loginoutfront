import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import ISignUp from 'src/common/interfaces/ISignUp';
import { ErrorMessage } from 'formik';
import { InputAdornment } from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/ErrorMessages';

export const useRegisterForm = (code:string | null) => {
  const history = useHistory();

  const [signupError, setSignupError] = useState({
    shown: false,
    message: '',
  });

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [invitationInfo, setInvitationInfo] = useState({
    companyId: '',
    companyName: '',
    title: '',
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please enter your name')
      .max(128, 'Your name input reaches 128 characters limit!'),
    email: Yup.string()
      .required('Please enter your email')
      .email('Invalid email address')
      .max(128, 'Your email address reaches 128 characters limit!'),
    password: Yup.string()
      .matches(
        /^(?=\S*[a-zA-Z])(?=\S*[0-9#!"$%&'()*+,-./:;<=>?@[\]^_`{|}~])\S{8,}$/,
        'Invalid password.Your password must be at least 8 character long and contains at least one non-letter character',
      ).max(128, 'Your password input reaches 128 characters limit!')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Please confirm your password'),
  });

  const fetchDataFromInvitationLink = async () => {
    localStorage.clear();
    const getInvitationInfoResponse = await apiUtils.getInvitationInfo(code);
    if (getInvitationInfoResponse.status === 200) {
      setInvitationInfo({
        companyId: getInvitationInfoResponse.data.companyId.toString(),
        companyName: getInvitationInfoResponse.data.companyName,
        title: getInvitationInfoResponse.data.title,
      });
      setInitialValues({
        ...initialValues,
        name: getInvitationInfoResponse.data.name,
        email: getInvitationInfoResponse.data.email,
      });
    }
  };
  const { companyId, title, companyName } = invitationInfo;
  const handleOnSubmit = useCallback(async ({ name, email, password }:ISignUp) => {
    try {
      const signupResponse = await apiUtils.invitationsRegister({ name, email, password, companyId, title });
      if (signupResponse.status === 200) {
        localStorage.setItem('name', signupResponse.data.name);
        localStorage.setItem('email', signupResponse.data.email);
        localStorage.setItem('userId', signupResponse.data.id);
        localStorage.setItem('companyId', companyId.toString());
        localStorage.setItem('login', 'true');
        history.push('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setSignupError({
            shown: true,
            message: INTERNAL_SERVER_ERROR,
          });
        }
      }
    }
  }, [history, setSignupError, companyId, title]);
  return { fetchDataFromInvitationLink, initialValues, validationSchema, handleOnSubmit, signupError, companyName };
};

export const useExtraFormConf = () => {
  const getStartAdornment = useCallback((component: JSX.Element) => ({
    startAdornment: (
      <InputAdornment position="start">
        {component}
      </InputAdornment>
    ),
  }), []);

  const getErrorMsg = useCallback((name: string) => (
    <ErrorMessage name={name}>
      { (msg) => <span className="errorMessage">{msg}</span>}
    </ErrorMessage>
  ), []);
  return { getStartAdornment, getErrorMsg };
};
