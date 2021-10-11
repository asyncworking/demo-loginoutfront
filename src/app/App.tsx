/*  eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Footer from 'src/components/Footer/Footer';
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
    <Footer isLoginPage={false} />
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
        {/* <Route path="/invitations/info" component={InvitationRegisterPage} /> */}
        <PrivateRoute path="/firstlogin" component={FirstLoginContainer} />
        <PrivateRoute path="/dashboard" component={DashBoard} />

        {/* <PrivateRoute path="/company/edit" component={EditCompany} />  */}
        {/* <PrivateRoute path="/project/:projectId/edit" component={EditProject} /> */}
        {/* <PrivateRoute path="/project/:projectId/people/users/edit" component={NotFoundPage} /> */}
        {/* <PrivateRoute path="/project/:projectId/todolistset" component={TodosPanel} /> */}
        {/* <PrivateRoute exact path="/project/:projectId/messages" component={MessageBoard} />
        <PrivateRoute path="/project/:projectId/messages/:messageId" component={MessageDetails} />
        <PrivateRoute path="/project/:projectId/new-message" component={NewMessagePage} />
        <PrivateRoute exact path="/project/:projectId/todolists/:todolistId" component={TodoListPage} />
        <PrivateRoute exact path="/project/:projectId/todoitems/:todoItemId" component={TodoItemPage} />
        <PublicRoute component={NotFoundPage} /> */}
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
