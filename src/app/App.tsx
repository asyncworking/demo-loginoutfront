/*  eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import SignupContainer from '../components/Signup/SignupContainer';
import EmailActivationPage from '../components/Signup/components/EmailActivationPage/EmailActivationPage';
import FirstLoginContainer from '../components/FirstLogin/FirstLoginContainer';
import DashBoard from '../components/DashBoard/DashBoard';
import VerifiedPage from '../components/Signup/components/VerifiedPage/VerifiedPage';
import Login from '../components/Login/Login';
import theme from './theme';
import './App.scss';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <>
    <Route
      {...rest}
      render={
        (props) => (
          localStorage.getItem('accessToken')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  </>
);

const PublicRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={
      (props) => (
        localStorage.getItem('accessToken')
          ? <Redirect to={{ pathname: '/dashboard' }} />
          : <Component {...props} />
      )
    }
  />
);

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={SignupContainer} />
        <PublicRoute path="/activation" component={EmailActivationPage} />
        <PublicRoute path="/verifylink" component={VerifiedPage} />
        <PrivateRoute path="/firstlogin" component={FirstLoginContainer} />
        <PrivateRoute path="/dashboard" component={DashBoard} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
