import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import InvitationErrorMessage from '../../InvitationErrorMessage/InvitationErrorMessage';

describe('<InvitationRegisterForm /> error', () => {
  it('should display error message when internal server error', async () => {
    render(
      <Router>
        <InvitationErrorMessage content="message" active />
      </Router>,
    );

    expect(await screen.findByText('message')).toBeInTheDocument();
  });
});
