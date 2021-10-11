import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { act, render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import FirstLoginForm from '../../FirstLoginForm';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
describe('LoginForm Component', () => {
  const server = setupServer(
    rest.post(`${baseUrl}/companies` || 'http://localhost:8080/api/v1/companies', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(500),
      // And a response body, if necessary
    )),
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });

  it('should display correct error alert when internal server error happens', async () => {
    render(
      <Router>
        <FirstLoginForm />
      </Router>,
    );

    const companyInput = screen.getByPlaceholderText(/Your company name/i);
    const titleInput = screen.getByPlaceholderText('Your job title(optional)');
    const doneButton = screen.getByText('Done');

    act(() => {
      fireEvent.change(companyInput, { target: { value: 'chui' } });
    });

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'VI' } });
    });

    act(() => {
      fireEvent.click(doneButton);
    });

    expect(await screen.findByText('Internal server problem, please try again!')).toBeInTheDocument();
  });
});
