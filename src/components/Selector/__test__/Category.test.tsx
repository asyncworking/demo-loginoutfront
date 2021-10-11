import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Category from '../components/Category/Category';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('Display project categories', () => {
  const messageCategories = [
    {
      messageCategoryId: '1',
      projectId: 1,
      categoryName: 'Announcement',
      emoji: '📢',
    },
    {
      messageCategoryId: '2',
      projectId: 1,
      categoryName: 'FYI',
      emoji: '✨',
    },
    {
      messageCategoryId: '3',
      projectId: 1,
      categoryName: 'Heartbeat',
      emoji: '❤️',
    },
    {
      messageCategoryId: '4',
      projectId: 1,
      categoryName: 'Pitch',
      emoji: '💡',
    },
    {
      messageCategoryId: '5',
      projectId: 1,
      categoryName: 'Question',
      emoji: '👋',
    },
  ];

  const server = setupServer(
    rest.get(`${baseUrl}/projects/1/message-categories` || 'http://localhost:8080/api/v1/projects/1/message-categories', (req, res, ctx) => res(
      ctx.status(200), ctx.json(messageCategories),
    )),
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const getCategoryId = jest.fn();

  it('should return id options__selected', async () => {
    await render(
      <MemoryRouter>
        <Category
          key={messageCategories[0].messageCategoryId}
          messageCategory={messageCategories[0]}
          select="📢 Announcement"
          getCategoryId={getCategoryId}
        />
      </MemoryRouter>,
    );

    const id = screen.getByTestId(messageCategories[0].messageCategoryId).getAttribute('id');

    expect(id).toEqual('options__selected');
  });

  it('should return id null', async () => {
    await render(
      <MemoryRouter>
        <Category
          key={messageCategories[1].messageCategoryId}
          messageCategory={messageCategories[1]}
          select="📢 Announcement"
          getCategoryId={getCategoryId}
        />

      </MemoryRouter>,
    );

    const id = screen.getByTestId(messageCategories[1].messageCategoryId).getAttribute('id');

    expect(id).toEqual('null');
  });
});
