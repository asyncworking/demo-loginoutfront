import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MessageList from '../components/MessageList/MessageList';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('<MessageList>', () => {
  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/messages` || 'http://localhost:8080/api/v1/projects/:projectId/messages', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json([{
        id: 1,
        messageTitle: 'title1',
        posterUser: 'name1',
        messageCategoryId: 1,
        messageCategoryName: 'Announcement',
        messageCategoryEmoji: '📢',
        postTime: '2021-06-04T20:29:09.525308+10:00',
        content: 'good',
        originNotes: '<p>good</p>',
      },
      {
        id: 2,
        messageTitle: 'title2',
        posterUser: 'name2',
        messageCategoryId: null,
        messageCategoryName: null,
        messageCategoryEmoji: null,
        postTime: '2020-06-05T20:29:09.525308+10:00',
        content: new Array(130).join('a'),
        originNotes: '',
      },
      {
        id: 3,
        messageTitle: 'title3',
        posterUser: 'name3',
        messageCategoryId: 1,
        messageCategoryName: 'Announcement',
        messageCategoryEmoji: '📢',
        postTime: '2021-06-05T20:29:09.525308+10:00',
        content: null,
        originNotes: '',
      },
      {
        id: 4,
        messageTitle: 'title4',
        posterUser: 'name4',
        messageCategoryId: null,
        messageCategoryName: null,
        messageCategoryEmoji: null,
        postTime: '2021-06-05T20:29:09.525308+10:00',
        content: null,
        originNotes: '',
      }]),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display message list title', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1/messages']}>
        <MessageList projectId="1" />
      </MemoryRouter>,
    );
    expect(await screen.findByText('title1')).toBeInTheDocument();
    expect(await screen.findByText('title2')).toBeInTheDocument();
    expect(await screen.findByText('📢 Announcement by name1 • Jun 04 —')).toBeInTheDocument();
    expect(await screen.findByText('good')).toBeInTheDocument();
    expect(await screen.findByText('name2 • Jun 05 2020 —')).toBeInTheDocument();
    expect(await screen.findByText('📢 Announcement by name3 • Jun 05')).toBeInTheDocument();
    expect(await screen.findByText('name4 • Jun 05')).toBeInTheDocument();
  });
});
