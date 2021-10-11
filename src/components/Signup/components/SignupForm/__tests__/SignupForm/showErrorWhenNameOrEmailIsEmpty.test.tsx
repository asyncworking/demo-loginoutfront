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

describe('SignupForm Component', () => {
  const server = setupServer(
    rest.get(process.env.REACT_APP_ASYNC_WORK_API || 'http://localhost:8080/api/v1/signup', (req, res, ctx) => res(
      ctx.status(500),
      ctx.json({
        errorMessage: 'User not found',
      }),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('should display correct error when name or email is empty', async () => {
    render(
      <Router>
        <SignupForm />
      </Router>,
    );

    const nameInput = screen.getByPlaceholderText(/Your name/i);
    const emailInput = screen.getByPlaceholderText('Your email (e.g.abc@abc.abc)');
    const nextButton = screen.getByText('Next');

    act(() => {
      fireEvent.change(nameInput, { target: { value: '' } });
    });

    act(() => {
      fireEvent.change(emailInput, { target: { value: '' } });
    });

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(await screen.findByText('Please enter your name')).toBeInTheDocument();
    expect(await screen.findByText('Please enter your email')).toBeInTheDocument();
  });
});
