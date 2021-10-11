import React from 'react';
import {
  Box,
  Grid,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import './VerifiedPage.scss';
import VerifiedMessageWindow from './components/VerifiedMessageWindow/VerifiedMessageWindow';

const themePalette = createMuiTheme({
  palette: {
    primary: {
      main: '#2ab782',
    },
    secondary: {
      main: '#5f11cb',
    },
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        color: '#f44336',
      },
    },
  },
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    width: 300,
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
}));

const VerifiedPage = () => {
  const classes = useStyles();
  const titleName = 'Sign up';
  return (
    <ThemeProvider theme={themePalette}>
      <Container maxWidth="xs">
        <Grid container wrap="nowrap" direction="column" className={classes.grid}>
          <Box component="span" m={1}>
            <Typography variant="h5" color="primary" className={classes.title}>
              {titleName}
            </Typography>
            <Paper className={classes.paper}>
              <VerifiedMessageWindow />
            </Paper>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default VerifiedPage;
