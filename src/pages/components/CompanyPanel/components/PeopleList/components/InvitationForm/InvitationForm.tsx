/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-new */
import React from 'react';
import './InvitationForm.scss';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Container,
  Button,
  TextField,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Clipboard from 'clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IInviteMember from 'src/common/interfaces/IInviteMember';
import { EMAIL_NAME_NULL_ERROR, PEOPLE_ALREADY_EXIST } from 'src/common/constants/ErrorMessages';
import StyledErrorMessage from 'src/components/StyledErrorMessage/StyledErrorMessage';
import * as apiUtils from 'src/utils/apiUtils';

new Clipboard('.btn');

const useStyles = makeStyles((theme: Theme) => createStyles({
  closeButton: {
    color: 'red',
  },
  submit: {
    marginTop: theme.spacing(4),
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
  },
  copy: {
    marginTop: theme.spacing(3),
    display: 'flex',
  },
  copyRight: {
    marginLeft: theme.spacing(5),
  },
  errorBoxName: {
    position: 'inherit',
    marginBottom: '6px',
    '& p': {
      marginLeft: '110px',
      marginTop: '-27px',
      fontSize: '0.9rem',
    },
  },
}));

const InvitationForm = ({ closeForm }: any) => {
  const classes = useStyles();

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);
  const [copy, setCopy] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showErrorText, setShowErrorText] = React.useState(false);

  const initialValues: IInviteMember = {
    name: '',
    email: '',
    title: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255, 'Your name can not exceed 255 characters.'),
    email: Yup.string().email().max(255, 'Your email address can not exceed 255 characters.'),
    title: Yup.string().max(255, 'Your title can not exceed 255 characters.'),
  });
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [link, setLink] = React.useState({
    invitationLink: '',
  });
  const onSubmit = async ({ name, email, title }: IInviteMember) => {
    if (name === '' || email === '') {
      setOpen(true);
    }
    if (name !== '' && email !== '') {
      setOpen(false);
      const companyId = localStorage.getItem('companyId');
      try {
        const emailResponse = await apiUtils.verifyEmailExists({ email });
        if (emailResponse.status === 200) {
          try {
            const invitationResponse = await apiUtils.getInvitationLink({ name, email, title, companyId });
            if (invitationResponse.status === 200) {
              setShowErrorText(false);
              setShow(true);
              setLink({
                invitationLink: invitationResponse.data,
              });
            }
          } catch (error) {
            if (error.response.status === 404) {
              setShow(false);
            }
          }
        }
      } catch (error) {
        if (error.response.status === 409) {
          setShow(false);
          setShowErrorText(true);
        }
      }
    }
  };

  const action = (
    <IconButton className={classes.closeButton} color="inherit" size="medium" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const onClose = (
    closeForm
  );

  const handleCopyClick = () => {
    setCopy(true);
  };

  const handleCopyClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setCopy(false);
  };

  return (
    <Container>
      <div className="form">
        <header className="form-title">
          <h3 className="form-title">Who do you want to add?</h3>
          <IconButton
            size="medium"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </header>
        <Box className="invitationForm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                as={TextField}
                fullWidth
                id="name"
                name="name"
                label="Name:"
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label="Email:"
                helperText={<ErrorMessage className="people-form--invalid" name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                id="title"
                name="title"
                label="Title: (optional)"
                helperText={<ErrorMessage name="title" />}
              />
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Send Now
              </Button>
              {showErrorText && <StyledErrorMessage className={classes.errorBoxName} message={PEOPLE_ALREADY_EXIST} />}
            </Form>
          </Formik>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={EMAIL_NAME_NULL_ERROR}
            action={action}
          />
          {show
            ? (
              <Box>
                <div className="divider"> </div>
                <Box id="copy">
                  <input id="board" value={link.invitationLink} />
                  <Button
                    id="copyButton"
                    className="btn"
                    data-clipboard-target="#board"
                    color="primary"
                    variant="contained"
                    onClick={handleCopyClick}
                  >
                    <FileCopyIcon />
                  </Button>
                </Box>

              </Box>
            )
            : null}
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={copy}
            autoHideDuration={3000}
            onClose={handleCopyClose}
          >
            <Alert onClose={handleCopyClose} severity="success">
              Copy Successfully!
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </Container>
  );
};

export default InvitationForm;
