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
import InvitationRegisterPage from '../components/InvitationRegister/InvitationRegisterPage';
import FirstLoginContainer from '../components/FirstLogin/FirstLoginContainer';
import DashBoard from '../components/DashBoard/DashBoard';
import NotFoundPage from '../pages/components/NotFoundPage/NotFoundPage';
import VerifiedPage from '../components/Signup/components/VerifiedPage/VerifiedPage';
import EditCompany from '../pages/components/CompanyPanel/components/EditCompany/EditCompany';
import EditProject from '../pages/components/ProjectPanel/components/EditProject/EditProject';
import Login from '../components/Login/Login';
import theme from './theme';
import TodosPanel from '../pages/components/TodosPanelPage/TodosPanelPage';
import TodoListPage from '../pages/components/TodosPanelPage/components/TodoListPage/TodoListPage';
import TodoItemPage from '../pages/components/TodosPanelPage/components/TodoItemPage/TodoItemPage';
import MessageBoard from '../pages/components/MessageBoard/MessageBoard';
import NewMessagePage from '../pages/components/MessageBoard/components/NewMessagePage/NewMessagePage';
import MessageDetails from '../pages/components/MessageBoard/components/MessageDetails/MessageDetails';
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
        <Route path="/invitations/info" component={InvitationRegisterPage} />
        <PrivateRoute path="/firstlogin" component={FirstLoginContainer} />
        <PrivateRoute path="/dashboard" component={DashBoard} />
        <PrivateRoute path="/company/edit" component={EditCompany} />
        <PrivateRoute path="/project/:projectId/edit" component={EditProject} />
        <PrivateRoute path="/project/:projectId/people/users/edit" component={NotFoundPage} />
        <PrivateRoute path="/project/:projectId/todolistset" component={TodosPanel} />
        <PrivateRoute exact path="/project/:projectId/messages" component={MessageBoard} />
        <PrivateRoute path="/project/:projectId/messages/:messageId" component={MessageDetails} />
        <PrivateRoute path="/project/:projectId/new-message" component={NewMessagePage} />
        <PrivateRoute exact path="/project/:projectId/todolists/:todolistId" component={TodoListPage} />
        <PrivateRoute exact path="/project/:projectId/todoitems/:todoItemId" component={TodoItemPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
