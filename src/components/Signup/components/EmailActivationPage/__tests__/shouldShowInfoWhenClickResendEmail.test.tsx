import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import EmailActivationWindow from '../components/EmailActivationWindow/EmailActivationWindow';

describe('EmailActivationPage Component', () => {
  it('should display correct error alert when username and password is wrong', async () => {
    render(
      <Router>
        <EmailActivationWindow />
      </Router>,
    );

    const resendLink = screen.getByText('Resend Email');

    act(() => {
      fireEvent.click(resendLink);
    });

    expect(await screen.findByText('We have resent you an email, please check your inbox.')).toBeInTheDocument();
  });
});
