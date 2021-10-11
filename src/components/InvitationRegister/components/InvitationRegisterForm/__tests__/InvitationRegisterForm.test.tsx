import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import InvitationRegisterForm from '../InvitationRegisterForm';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
describe('<InvitationRegisterForm /> error', () => {
  it('should display error message when and password is empty', async () => {
    render(
      <Router>
        <InvitationRegisterForm />
      </Router>,
    );

    const signInButton = screen.getByTestId('incitationFormSignup');

    act(() => {
      fireEvent.click(signInButton);
    });

    expect(await screen.findByText('Please enter your password')).toBeInTheDocument();
  });
});

describe('<InvitationRegisterForm />', () => {
  const server = setupServer(
    rest.post(`${baseUrl}/invitations/info` || 'http://localhost:8080/api/v1/invitations/info', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json({
        companyId: 1,
        email: '123@1233.com',
        name: '测试122',
        title: '1',
      }),
      // And a response body, if necessary
    )),
    rest.get(`${baseUrl}/companies/:companyId/profile` || 'http://localhost:8080/api/v1/companies/:companyId/profile', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json({
        companyId: 1,
        name: 'async working company',
      }),
      // And a response body, if necessary
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display error message when and password is empty', async () => {
    render(
      <Router>
        <InvitationRegisterForm />
      </Router>,
    );

    const signInButton = screen.getByTestId('incitationFormSignup');

    act(() => {
      fireEvent.click(signInButton);
    });

    expect(await screen.findByText('Please enter your password')).toBeInTheDocument();
  });
});
