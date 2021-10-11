import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  act,
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SignupForm from '../../SignupForm';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('SignupForm Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/signup` || 'http://localhost:8080/api/v1/signup', (req, res, ctx) => res(
      ctx.status(500),
    )),
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });
  it('should display correct error when email is invaild', async () => {
    render(
      <Router>
        <SignupForm />
      </Router>,
    );

    const emailInput = screen.getByPlaceholderText('Your email (e.g.abc@abc.abc)');
    const nextButton = screen.getByText('Next');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'abcabc.abc' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'abc@abcabc' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });
});
