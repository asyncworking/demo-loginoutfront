/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TodoSet from '../components/TodoSet/TodoSet';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('ToDoList Component', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/todolists` || 'http://localhost:8080/api/v1/projects/:projectId/todolists', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          projectId: 1,
          todoListTitle: 'name',
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
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display ToDo list title', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1/todolistset']}>
        <TodoSet projectId="1" />
      </MemoryRouter>,
    );
    expect(await screen.findByText('name')).toBeInTheDocument();
  });
});
