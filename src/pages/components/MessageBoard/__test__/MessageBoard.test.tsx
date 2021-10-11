import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MessageBoard from '../MessageBoard';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('<MessageBoard />', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'p1',
        description: null,
      }),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display project name', async () => {
    render(
      <MemoryRouter initialEntries={['/project/:projectId/messages']}>
        <MessageBoard />
      </MemoryRouter>,
    );
    expect(await screen.findByText('p1')).toBeInTheDocument();
  });
});
