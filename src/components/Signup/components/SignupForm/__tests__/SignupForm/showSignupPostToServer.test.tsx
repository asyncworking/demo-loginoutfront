import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render } from '@testing-library/react';
import SignupForm from '../../SignupForm';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const server = setupServer(
  rest.post(`${baseUrl}/signup` || 'localhost:8080/api/v1/signup', (req, res, ctx) => res(
    ctx.status(400),
  )),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SignupForm Component', () => {
  it('should display correct error when send wrong post to server', async () => {
    render(
      <Router>
        <SignupForm />
      </Router>,
    );
  });
});
