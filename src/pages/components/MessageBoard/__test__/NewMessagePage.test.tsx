import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import NewMessagePage from '../components/NewMessagePage/NewMessagePage';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('<NewMessagePage />', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'p1',
        description: null,
        projectUserNames: ['zzz1', 'zzz2'],
      }),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display project name', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NewMessagePage />
      </MemoryRouter>,
    );
    expect(await screen.findByText('p1')).toBeInTheDocument();
    expect(await screen.findByText('Message Board')).toBeInTheDocument();
  });
});
