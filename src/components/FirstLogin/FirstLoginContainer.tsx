import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FirstLoginForm from './components/FirstLoginForm/FirstLoginForm';
import './FirstLoginContainer.scss';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  notice: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const FirstLoginContainer: React.FC = () => {
  const classes = useStyles();
  const titleName = 'Welcome';
  const welcomeContent = 'Please tell us a bit about yourself.';
  return (
    <Container maxWidth="xs">
      <Grid container wrap="nowrap" direction="column" className={classes.grid}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Typography variant="h5" color="primary" className={classes.title}>
            {titleName}
          </Typography>
        </Grid>
        <Paper className={classes.paper}>
          <Typography variant="body1" className={classes.notice}>
            {welcomeContent}
          </Typography>
          <FirstLoginForm />
        </Paper>
      </Grid>
    </Container>
  );
};

export default FirstLoginContainer;
