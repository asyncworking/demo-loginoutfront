import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TodoSet from '../components/TodoSet/TodoSet';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
describe('Display Todo Items Due Date', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/1/todolists?quantity=50` || 'http://localhost:8080/api/v1/projects/1/todolists?quantity=50', (req, res, ctx) => res(
      ctx.status(200), ctx.json([
        {
          id: 3,
          todoListTitle: 'This is the todolist title three',
          details: 'This is the details three',
          todoItemGetDtos: [
            {
              todoItemId: 1,
              description: 'This is the description one',
              notes: 'This is the notes one',
              dueDate: '2017-10-20',
            },
          ],
        },
      ]),
    )),
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render to do item due date', async () => {
    render(
      <Router>
        <TodoSet projectId="1" />
      </Router>,
    );
    expect(await screen.findByText('Fri, Oct 20, 2017')).toBeInTheDocument();
  });
});
