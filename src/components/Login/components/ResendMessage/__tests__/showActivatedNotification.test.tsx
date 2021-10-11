import React from 'react';
import { act, render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ResendMessage from '../ResendMessage';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
describe('ResendMessage Component', () => {
  const server = setupServer(
    rest.post(`${baseUrl}/resend` || 'http://localhost:8080/api/v1/resend', (req, res, ctx) => res(
      ctx.status(200),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display activated notification', async () => {
    render(
      <ResendMessage />,
    );

    const resendButton = screen.getByText('Click here to resend verification email');

    act(() => {
      fireEvent.click(resendButton);
    });

    expect(await screen.findByText('activated!')).toBeInTheDocument();
  });
});
