/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import {
  Field,
  Formik,
  Form,
  ErrorMessage,
  FormikConfig,
  FormikValues,
  FormikHelpers,
} from 'formik';
import {
  useHistory,
} from 'react-router-dom';
import * as Yup from 'yup';
import * as apiUtils from 'src/utils/apiUtils';
import ISignUp from 'src/common/interfaces/ISignUp';
import IVerifyEmailExists from 'src/common/interfaces/IVerifyEmailExists';
import { INTERNAL_SERVER_ERROR, EMAIL_EXISTS_ERROR } from 'src/common/constants/ErrorMessages';
import SignupErrorMessage from '../SignupErrorMessage/SignupErrorMessage';
import './SignupForm.scss';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonContainer: {
    padding: theme.spacing(1),
  },
}));

const SignupForm: React.FC = () => {
  const Wizard = ({ children, initialValues }: FormikConfig<FormikValues>) => {
    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children) as React.ReactElement<FormikConfig<FormikValues>>[];
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isSubmitStep = stepNumber === totalSteps - 1;

    const next = (values: FormikValues) => {
      setSnapshot(values);
      setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };
    const handleSubmit = (values: FormikValues, bag: FormikHelpers<FormikValues>) => {
      if (step.props.onSubmit) {
        step.props.onSubmit(values, bag);
      } else {
        setStepNumber((s) => s + 1);
      }
      bag.setTouched({});
      next(values);
    };
    const classes = useStyles();
    return (
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            {step}
            <Grid container spacing={3} justify="space-around" alignItems="center" className={classes.buttonContainer}>
              {stepNumber > 0 && (
                <Grid item xs={4}>
                  <Button
                    onClick={() => setStepNumber((s) => s - 1)}
                    disabled={isSubmitting}
                    type="button"
                    color="primary"
                    fullWidth
                  >
                    Back
                  </Button>
                </Grid>
              )}
              <Grid item xs={8}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  {isSubmitting ? 'Creating' : isSubmitStep ? 'Create Account' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    );
  };

  const WizardStep = ({ children }: any) => children;

  const initialValues = {
    name: '',
    email: '',
    linkNumber: '',
    score: null,
    password: '',
    confirmPassword: '',
  };
  const validationNameAndEmailSchema = Yup.object().shape({
    name: Yup.string().trim().required('Please enter your name').max(128, 'Your name input is too long!'),
    email: Yup.string().trim()
      .required('Please enter your email')
      .email('Invalid email address')
      .max(128, 'Your email address is too long!'),
    score: Yup.number().required('Please enter your score'),
    linkNumber: Yup.string().trim().required('Please enter your link number'),
  });
  const validationPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=\S*[a-zA-Z])(?=\S*[0-9#!"$%&'()*+,-./:;<=>?@[\]^_`{|}~])\S{8,}$/,
        'Invalid password.Your password must be at least 8 character long and contains at least one non-letter character',
      ).max(128, 'Too long!')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Please confirm your password'),
  });
  const [signupError, setSignupError] = useState({
    have: false,
    message: '',
    hasLink: false,
    linkContent: '',
    showLink: false,
  });

  const checkEmail = async ({ email }: IVerifyEmailExists, bag: FormikHelpers<FormikValues>) => {
    const trimedEmail = email.trim();
    try {
      await apiUtils.verifyEmailExists({ email: trimedEmail });
    } catch (error) {
      if (error.response.status >= 500) {
        setSignupError({
          have: true,
          message: INTERNAL_SERVER_ERROR,
          hasLink: false,
          linkContent: '',
          showLink: false,
        });
      }
      if (error.response.status === 409) {
        setSignupError({
          have: true,
          message: EMAIL_EXISTS_ERROR,
          hasLink: true,
          linkContent: 'Sign in here',
          showLink: true,
        });
      }
    }
    bag.setSubmitting(false);
  };
  const history = useHistory();
  const onCreateAccountSubmit = async ({ name, email, linkNumber, score, password }: ISignUp, bag: FormikHelpers<FormikValues>) => {
    const trimedEmail = email.trim();
    const trimedName = name.trim();
    const trimedLinkNumber = linkNumber.trim();
    try {
      const signupResponse = await apiUtils.signup({ name: trimedName, email: trimedEmail, linkNumber: trimedLinkNumber, score, password });
      if (signupResponse.status === 200) {
        localStorage.setItem('email', trimedEmail);
        history.push('/activation');
      }
    } catch (error) {
      if (error.response.status >= 500) {
        setSignupError({
          have: true,
          message: INTERNAL_SERVER_ERROR,
          hasLink: false,
          linkContent: '',
          showLink: false,
        });
      }
    }
    bag.setSubmitting(false);
  };
  return (
    <div>
      <Wizard
        initialValues={initialValues}
        onSubmit={() => { console.log('Finish'); }}
      >
        <WizardStep
          validationSchema={validationNameAndEmailSchema}
          onSubmit={checkEmail}
        >
          <SignupErrorMessage
            content={signupError.message}
            active={signupError.have}
            to="/login"
            hasLink={signupError.hasLink}
            linkContent={signupError.linkContent}
            activeLink={signupError.showLink}
          />
          <Box paddingTop={1} paddingBottom={2}>
            <Field as={TextField} fullWidth name="name" label="Your name" placeholder="Your name" helperText={<ErrorMessage name="name" />} />
          </Box>
          <Box paddingBottom={1}>
            <Field as={TextField} fullWidth name="email" label="Your email" placeholder="Your email (e.g.abc@abc.abc)" helperText={(<ErrorMessage name="email" />)} />
          </Box>
          <Box paddingBottom={1}>
            <Field as={TextField} fullWidth name="linkNumber" label="Your link number" placeholder="Your link number" helperText={(<ErrorMessage name="link number" />)} />
          </Box>
          <Box paddingBottom={1}>
            <Field as={TextField} fullWidth name="score" label="Your score" placeholder="Your score" helperText={(<ErrorMessage name="score" />)} />
          </Box>
        </WizardStep>
        <WizardStep
          validationSchema={validationPasswordSchema}
          onSubmit={onCreateAccountSubmit}
        >
          <Box paddingBottom={2}>
            <Field as={TextField} fullWidth name="password" type="password" label="Password" placeholder="Enter your password" helperText={<ErrorMessage name="password" />} />
          </Box>
          <Box paddingBottom={1}>
            <Field as={TextField} fullWidth name="confirmPassword" type="password" label="Confirm password" placeholder="Confirm your password" helperText={<ErrorMessage name="confirmPassword" />} />
          </Box>
        </WizardStep>
      </Wizard>
    </div>
  );
};

export default SignupForm;
