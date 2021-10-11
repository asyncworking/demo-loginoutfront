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
        projectUserNames: ['Steven S Wang'],
      }),
    )),
    rest.get(`${baseUrl}/projects/:projectId/members` || 'http://localhost:8080/api/v1/projects/:projectId/members', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Steven S Wang',
          email: 'user0001@test.com',
          title: 'Developer',
        }]),
    )),
    rest.get(`${baseUrl}/companies/:companyId` || 'http://localhost:8080/api/v1/companies/:companyId', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'Async Working',
        adminEmail: null,
        description: null,
        userTitle: null,
        website: null,
        contactNumber: null,
        contactEmail: null,
        industry: null,
      }),
    )),
    rest.get(`${baseUrl}/companies/:companyId/available-employees?projectId=2` || 'http://localhost:8080/api/v1/companies/:companyId/available-employees?projectId=2', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json([
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
        }]),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display available employees in current company', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/projects/2/members']}>
        <ProjectMembersPanel />
      </MemoryRouter>,
    );
    const addButton = screen.getByTestId('addPeople');
    act(() => {
      fireEvent.click(addButton);
    });
    expect(await screen.findByText('John')).toBeInTheDocument();
    const checkbox = screen.getAllByTestId('checkBox')[0].querySelector('input[type="checkbox"]') as HTMLElement;
    act(() => { fireEvent.click(checkbox); });
    expect(checkbox).toBeChecked();
    act(() => { fireEvent.click(checkbox); });
    expect(checkbox).not.toBeChecked();

    const selectAllButton = screen.getByTestId('selectAll');
    act(() => {
      fireEvent.click(selectAllButton);
    });

    const checkboxes = screen.getAllByTestId('checkBox');
    checkboxes.forEach((c) => {
      const checkBox = c.querySelector('input[type="checkbox"]') as HTMLElement;
      expect(checkBox).toBeChecked();
    });

    const selectNoneButton = screen.getByTestId('selectNone');
    act(() => {
      fireEvent.click(selectNoneButton);
    });

    checkboxes.forEach((c) => {
      const checkBox = c.querySelector('input[type="checkbox"]') as HTMLElement;
      expect(checkBox).not.toBeChecked();
    });
  });
});
