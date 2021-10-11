/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import ProjectPanel from '../ProjectPanel';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('ProjectPanel Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        projectId: 1,
        name: 'name',
        description: 'yyy',
        projectUserNames: ['zzz1', 'zzz2'],
      }),
    )),
    rest.get(`${baseUrl}/projects/:projectId/todolists` || 'http://localhost:8080/api/v1/projects/:projectId/todolists', (req, res, ctx) => {
      req.params = { quantity: 1 };
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            projectId: 1,
            todoListTitle: 'vvvvv',
            details: 'vvvvvv\n',
            originDetails: '<p>vvvvvv</p>',
            docUrl: null,
            todoItemGetDtos: [
              {
                todoItemId: 22,
                description: 'dddd',
                notes: '',
                originNotes: '',
                projectId: 1,
                completed: false,
                createdTime: '2021-07-06T10:43:50.929863+08:00',
                dueDate: '+11381-11-11T00:00:00+08:00',
              },
            ],
          },
        ]),
      );
    }),
    rest.get(`${baseUrl}/projects/:projectId/messages` || 'http://localhost:8080/api/v1/projects/:projectId/messages', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json([]),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display projectName', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/projectpanel/1']}>
        <ProjectPanel />
      </MemoryRouter>,
    );
    expect(await screen.findByText('name')).toBeInTheDocument();
  });
});
