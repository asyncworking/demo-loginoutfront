import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm Component', () => {
  it('should display correct error alert when username and password is wrong', async () => {
    render(
      <Router>
        <LoginForm />
      </Router>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByText('Log in');

    act(() => {
      fireEvent.change(emailInput, { target: { value: '' } });
    });

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '' } });
    });

    act(() => {
      fireEvent.click(signInButton);
    });

    expect(await screen.findByText('Email Required!')).toBeInTheDocument();
    expect(await screen.findByText('Password Required!')).toBeInTheDocument();
  });
});
