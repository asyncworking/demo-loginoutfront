import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IFirstLogin from '../../../../common/interfaces/IFirstLogin';
import * as apiUtils from '../../../../utils/apiUtils';
import FirstLoginErrorMessage from '../FirstLoginErrorMessage/FirstLoginErrorMessage';

const FirstLoginForm: React.FC = () => {
  const [warning, setWarning] = useState({
    shown: false,
    message: '',
  });
  const initialValues: IFirstLogin = {
    company: '',
    title: '',
  };
  const validationSchema = Yup.object().shape({
    company: Yup.string().trim().required('Please enter your company name').max(128, 'Your company name is too long'),
    title: Yup.string().max(128, 'Your title is too long!'),
  });
  const history = useHistory();
  const firstLoginOnSubmit = async ({ company, title }: IFirstLogin) => {
    const email = localStorage.getItem('email');
    const trimedCompany = company.trim();
    try {
      const companyResponse = await apiUtils.createCompany({ email, company: trimedCompany, title });
      if (companyResponse.status === 200) {
        localStorage.setItem('companyId', companyResponse.data);
        history.push('/dashboard');
      }
    } catch (error) {
      if (error.response.status >= 500) {
        setWarning({
          shown: true,
          message: 'Internal server problem, please try again!',
        });
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={firstLoginOnSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          {warning.shown ? <FirstLoginErrorMessage content={warning.message} /> : null}
          <Box paddingBottom={2} paddingTop={1}>
            <Field
              as={TextField}
              fullWidth
              id="company"
              name="company"
              label="Company"
              placeholder="Your company name"
              helperText={<ErrorMessage name="company" />}
            />
          </Box>
          <Box paddingBottom={2}>
            <Field
              as={TextField}
              fullWidth
              id="title"
              name="title"
              label="Title"
              placeholder="Your job title(optional)"
              helperText={<ErrorMessage name="title" />}
            />
          </Box>
          <Box paddingBottom={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Done
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FirstLoginForm;
