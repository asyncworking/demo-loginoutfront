/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import { Form, Formik, Field } from 'formik';
import formConfig from './config/index';
import InvitationErrorMessage from '../InvitationErrorMessage/InvitationErrorMessage';
import { useExtraFormConf, useRegisterForm } from './hooks';
import useCode from './hooks/useCode';
import useStyles from './InvitationRegisterForm.style';

const InvitationRegisterForm = () => {
  const classes = useStyles();

  const { getStartAdornment, getErrorMsg } = useExtraFormConf();

  const { code } = useCode();

  const {
    fetchDataFromInvitationLink,
    initialValues,
    validationSchema,
    handleOnSubmit,
    signupError,
    companyName,
  } = useRegisterForm(code);

  const { nameInput, emailInput, passwordInput, confirmPasswordInput } = formConfig;

  const joinTitle = `Join ${companyName} on Async Working`;

  useEffect(() => {
    fetchDataFromInvitationLink();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.invitationRegisterContainer}>
      <h4>{joinTitle}</h4>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InvitationErrorMessage content={signupError.message} active={signupError.shown} />
            <Field
              {...nameInput}
              as={TextField}
              helperText={getErrorMsg('name')}
              InputProps={getStartAdornment(<AccountCircle />)}
            />
            <Field
              {...emailInput}
              as={TextField}
              InputProps={getStartAdornment(<AccountCircle />)}
            />
            <Field
              {...passwordInput}
              as={TextField}
              helperText={getErrorMsg('password')}
              InputProps={getStartAdornment(<LockRounded />)}
            />
            <Field
              {...confirmPasswordInput}
              as={TextField}
              helperText={getErrorMsg('confirmPassword')}
              InputProps={getStartAdornment(<LockRounded />)}
            />
            <Button
              type="submit"
              fullWidth
              data-testid="incitationFormSignup"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={isSubmitting}
            >
              OK, LET&apos;S GO
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InvitationRegisterForm;
