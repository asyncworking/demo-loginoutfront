import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MessageDetails from '../components/MessageDetails/MessageDetails';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

describe('<MessageDetail>', () => {
  const message = {
    id: 2,
    messageTitle: 'title2',
    posterUser: 'name2',
    messageCategoryId: 1,
    messageCategoryName: 'Announcement',
    messageCategoryEmoji: '📢',
    postTime: '2021-06-24T20:29:09.525308+10:00',
    content: 'good',
    originNotes: '<p>good</p>',
    subscribersIds: '1,2',
  };

  const server = setupServer(
    rest.get(`${baseUrl}/projects/:projectId/messages/:messageId` || 'http://localhost:8080/api/v1/projects/:projectId/messages/:messageId', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json(message),
    )),
    rest.get(`${baseUrl}/projects/:projectId/project-info` || 'http://localhost:8080/api/v1/projects/:projectId/project-info', (req, res, ctx) => res(
      // Send a valid HTTP status code
      ctx.status(200),
      ctx.json({
        projectId: 1,
        name: 'name',
        description: 'yyy',
        projectUserNames: ['zzz1', 'zzz2'],
      }),
    )),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display message title', async () => {
    render(
      <MemoryRouter initialEntries={['/project/1/messages/2']}>
        <MessageDetails />
      </MemoryRouter>,
    );
    expect(await screen.findByText('title2')).toBeInTheDocument();
    expect(await (await screen.findByTestId('test-postInfo')).innerHTML).toEqual('📢 Announcement by name2');
    expect(await screen.findByText('name')).toBeInTheDocument();
    expect(await screen.findByText('Jun 24 · Notified 2 people')).toBeInTheDocument();
    expect(await screen.findByText('good')).toBeInTheDocument();
  });
});
