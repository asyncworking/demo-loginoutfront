import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import InvitationRegisterPage from '../../../InvitationRegisterPage';

describe('<InvitationRegisterPage />', () => {
  it('should display sign in link', async () => {
    render(
      <Router>
        <InvitationRegisterPage />
      </Router>,
    );

    expect(await screen.findByText('Sign In Now')).toBeInTheDocument();
  });
});
