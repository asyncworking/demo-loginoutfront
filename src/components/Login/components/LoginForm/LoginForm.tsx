/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
  Grid,
  Checkbox,
  Typography,
  SvgIcon,
  TextField,
  Box,
  FormControlLabel } from '@material-ui/core';
import { ReactComponent as emailIcon } from 'src/assets/svgs/emailIcon.svg';
import { ReactComponent as passwordIcon } from 'src/assets/svgs/passwordIcon.svg';
import { Form, Formik, Field } from 'formik';
import {
  Link,
} from 'react-router-dom';
import { useExtraFormConf, useLoginForm } from './hooks';
import formConfig from './config';
import useStyles from './LoginForm.style';
import WarningMessage from '../WarningMessage/WarningMessage';
import ResendMessage from '../ResendMessage/ResendMessage';

const LoginForm = () => {
  const classes = useStyles();
  const { initialValues, validationSchema, handleOnSubmit, warning, resendMessage } = useLoginForm();
  const { getStartAdornment, getErrorMsg } = useExtraFormConf();
  const { emailInput, passwordInput, rememberInput } = formConfig;
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              {warning.shown ? <WarningMessage content={warning.message} /> : null}
            </div>
            <div>
              {resendMessage.shown ? <ResendMessage /> : null}
            </div>
            <Field
              {...emailInput}
              as={TextField}
              helperText={getErrorMsg('email')}
              InputProps={getStartAdornment(<SvgIcon component={emailIcon} viewBox="0 0 32 32" />)}
            />
            <Box marginTop={2} marginBottom={2}>
              <Field
                {...passwordInput}
                as={TextField}
                helperText={getErrorMsg('password')}
                InputProps={getStartAdornment(<SvgIcon component={passwordIcon} viewBox="0 0 32 32" />)}
              />
            </Box>
            <Box marginTop={2}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <Field
                    {...rememberInput}
                    as={FormControlLabel}
                    control={<Checkbox value="remember" />}
                    classes={{
                      label: classes.label,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>
                    <Link className={classes.forget_link} to="/">
                      Forgot Password?
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box marginTop={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.login_button}
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Box>
            <Box paddingTop={2}>
              <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography className={classes.account}>
                    Do you have a new account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <Link className={classes.signup_link} to="/signup">
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
