import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import baseUrl from 'src/utils/apiUrls';
import ProjectMembersPanel from 'src/pages/components/ProjectPanel/components/ProjectMembersPanel/ProjectMembersPanel';

describe('ProjectMembersPanel Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        id: 2,
        name: 'Ark',
        description: 'It is a test',
        projectUserNames: ['Steven S Wang', 'John', 'John Doe Doe'],
      }),
    )),
    rest.get(`${baseUrl}/projects/:projectId/members` || 'http://localhost:8080/api/v1/projects/:projectId/members', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Steven S Wang',
          email: 'user0001@test.com',
          title: 'Developer',
        },
        {
          id: 3,
          name: 'John',
          email: 'user0003@test.com',
          title: 'UI Designer',
        },
        {
          id: 4,
          name: 'John Doe Doe',
          email: 'user0004@test.com',
          title: 'Business Analyst',
        },
      ]),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display added project members in current project', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/projects/2/members']}>
        <ProjectMembersPanel />
      </MemoryRouter>,
    );
    const addButton = screen.getByTestId('addPeople');
    act(() => {
      fireEvent.click(addButton);
    });
    const selectAllButton = screen.getByTestId('selectAll');
    act(() => {
      fireEvent.click(selectAllButton);
    });
    const addPeopleButton = screen.getByTestId('addSelectedPeople');
    act(() => {
      fireEvent.click(addPeopleButton);
    });
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(await screen.findByText('John Doe Doe')).toBeInTheDocument();
  });

  it('should close invitation popup when no one has been chosen', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/projects/2/members']}>
        <ProjectMembersPanel />
      </MemoryRouter>,
    );
    const addButton = screen.getByTestId('addPeople');
    act(() => {
      fireEvent.click(addButton);
    });
    const addPeopleButton = screen.getByTestId('addSelectedPeople');
    act(() => {
      fireEvent.click(addPeopleButton);
    });
    expect(screen.queryByTestId(/member/)).toBeNull();
  });
});
