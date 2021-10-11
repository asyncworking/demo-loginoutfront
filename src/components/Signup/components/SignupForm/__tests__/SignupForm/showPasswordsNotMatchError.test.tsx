import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  act,
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SignupForm from '../../SignupForm';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('SignupForm Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/signup` || 'http://localhost:8080/api/v1/signup', (req, res, ctx) => res(
      ctx.status(200),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('should display correct error when passwords do not match', async () => {
    render(
      <Router>
        <SignupForm />
      </Router>,
    );

    const nameInput = screen.getByPlaceholderText(/Your name/i);
    const emailInput = screen.getByPlaceholderText('Your email (e.g.abc@abc.abc)');
    const nextButton = screen.getByText('Next');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'ddd' } });
    });

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'ddd@qq.com' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    const createAccountButton = await waitFor(() => screen.findByRole('button', { name: /Create Account/i }));

    act(() => {
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      fireEvent.change(passwordInput, { target: { value: 'yyyyyyyy1' } });
    });

    act(() => {
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
      fireEvent.change(confirmPasswordInput, { target: { value: 'xxxxxxxx1' } });
    });

    act(() => {
      fireEvent.click(createAccountButton);
    });
    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
  });
});
