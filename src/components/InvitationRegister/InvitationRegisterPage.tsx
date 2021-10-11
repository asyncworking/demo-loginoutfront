import React from 'react';
import { Box, Grid, Paper, Container, Typography, ThemeProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../assets/svgs/logoWithoutTexts.svg';
import InvitationRegisterForm from './components/InvitationRegisterForm/InvitationRegisterForm';
import { useStyles, themePalette } from './InvitationRegisterPage.style';

const InvitationRegisterPage: React.FC = () => {
  const classes = useStyles();

  const titleName = 'Already have an account?';
  return (
    <ThemeProvider theme={themePalette}>
      <Container maxWidth="xs">
        <Grid container wrap="nowrap" direction="column" className={classes.grid}>
          <Box component="span" m={1}>
            <img src={logo} className="img" alt="logo" />
            <Typography variant="h5" className={classes.title}>
              <div className={classes.titlebanner}>
                <div className={classes.titlebanner__title}>{titleName}</div>
                <Link to="/login" className={classes.link}>
                  Sign In Now
                </Link>
              </div>
            </Typography>
            <Paper className={classes.paper}>
              <InvitationRegisterForm />
            </Paper>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default InvitationRegisterPage;
