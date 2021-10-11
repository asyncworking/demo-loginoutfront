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
  it('should display correct error when password is invalid', async () => {
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
      fireEvent.change(emailInput, { target: { value: 'lll@qq.com' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    const createAccountButton = await waitFor(() => screen.findByRole('button', { name: /Create Account/i }));

    act(() => {
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      fireEvent.change(passwordInput, { target: { value: 'Abcdefdgh' } });
    });

    act(() => {
      fireEvent.click(createAccountButton);
    });
    expect(await screen.findByText('Invalid password.Your password must be at least 8 character long and contains at least one non-letter character')).toBeInTheDocument();

    act(() => {
      const passwordInput = screen.getByPlaceholderText('Enter your password');
      fireEvent.change(passwordInput, { target: { value: '12@345!68' } });
    });

    act(() => {
      fireEvent.click(createAccountButton);
    });
    expect(await screen.findByText('Invalid password.Your password must be at least 8 character long and contains at least one non-letter character')).toBeInTheDocument();
  });
});
