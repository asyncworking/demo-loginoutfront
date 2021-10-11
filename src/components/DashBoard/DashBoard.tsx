/* eslint-disable react/no-unused-state */
/*  eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Home from './components/Home/Home';
import CompanyPanel from '../../pages/components/CompanyPanel/CompanyPanel';
import ProjectPanel from '../../pages/components/ProjectPanel/ProjectPanel';
import ProjectMembersPanel from '../../pages/components/ProjectPanel/components/ProjectMembersPanel/ProjectMembersPanel';
import TodosPanel from '../../pages/components/TodosPanelPage/TodosPanelPage';
import TodoList from '../../pages/components/TodosPanelPage/components/TodoListPage/TodoListPage';
import TodoItem from '../../pages/components/TodosPanelPage/components/TodoItemPage/TodoItemPage';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
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
);

const DashBoard = () => (
  <Grid>
    <div>
      <NavBar />
      <PrivateRoute exact path="/dashboard" component={Home} />
      <PrivateRoute path="/project/:projectId/todolistset" component={TodosPanel} />
      <PrivateRoute exact path="/project/:projectId/todolists/:todolistId" component={TodoList} />
      <PrivateRoute exact path="/project/:projectId/todoitems/:todoItemId" component={TodoItem} />
      <PrivateRoute path="/dashboard/companypanel/:companyId" component={CompanyPanel} />
      <PrivateRoute path="/dashboard/projectpanel/:projectId" component={ProjectPanel} />
      <PrivateRoute path="/dashboard/projects/:projectId/members" component={ProjectMembersPanel} />
    </div>
  </Grid>
);
export default DashBoard;
