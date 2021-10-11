import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import baseUrl from 'src/utils/apiUrls';
import ProjectMembersPanel from '../ProjectMembersPanel';

describe('ProjectMembersPanel Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json({
        projectId: 2,
        name: 'Ark',
        description: 'It is a test',
        projectUserNames: ['Steven S Wang', 'John'],
      }),
    )),
    rest.get(`${baseUrl}/projects/:projectId/members` || 'http://localhost:8080/api/v1/projects/:projectId/members', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json([
        {
          name: 'Steven S Wang',
          title: 'Developer',
          email: 'user0001@test.com',
        },
        {
          name: 'John',
          title: 'DevOps',
          email: 'user0002@test.com',
        },
      ]),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display project members in current project', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/projects/2/members']}>
        <ProjectMembersPanel />
      </MemoryRouter>,
    );
    expect(await screen.findByText('Steven S Wang')).toBeInTheDocument();
    expect(await screen.findByText('John')).toBeInTheDocument();
  });
});
