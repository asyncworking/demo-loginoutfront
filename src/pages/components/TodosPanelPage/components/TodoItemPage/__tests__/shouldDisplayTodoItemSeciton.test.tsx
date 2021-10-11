import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen } from '@testing-library/react';
import TodoItemSection from '../components/TodoItemSection/TodoItemSection';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
describe('Set the todoItem', () => {
  const todoItem = {
    todoItemId: '1',
    description: 'testDesc',
    notes: 'testNotes',
    originNotes: '<div>testNotes</div>',
    completed: false,
    createdTime: '2021-06-24T18:19:51.653494+10:00',
    dueDate: '2021-06-24T18:19:51.653494+10:00',
    createdUserName: 'jc',
  };
  const server = setupServer(
    rest.get(`${baseUrl}/projects/1/todoitems/1`,
      (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions,no-sequences
        ctx.status(200), ctx.json(todoItem);
      }),
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('should render TodoItemSection', async () => {
    render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <TodoItemSection
        modify
        setModify=""
        todoItem={todoItem}
        setTodoItem=""
        projectId="1"
      />,
    );
    expect(await screen.findByText('Select a date…')).toBeInTheDocument();
    expect(await screen.findByText('When done, notify')).toBeInTheDocument();
    expect(await screen.findByText('Due on')).toBeInTheDocument();
  });
});
