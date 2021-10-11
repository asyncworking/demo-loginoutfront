import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import { render, screen } from '@testing-library/react';
import NotificationPicker from 'src/components/NotificationPicker';

describe('should display notification picker with none selected person', () => {
  it('should render notification picker section with nobody is notified', async () => {
    const finalSelectedList1 = [] as IProjectMember[];
    const setFinalSelectedList1 = jest.fn();
    const projectId = '1';
    render(
      <MemoryRouter initialEntries={['/project/1/new-message']}>
        <NotificationPicker
          projectId={projectId}
          finalSelectedList={finalSelectedList1}
          setFinalSelectedList={setFinalSelectedList1}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText('When I post this, nobody will be notified')).toBeInTheDocument();
  });
});

describe('should display notification picker with one selected person', () => {
  it('should render notification picker section with 1 person is notified', async () => {
    const finalSelectedList2 = [{
      id: '1',
      name: 'user1',
      email: 'user1@gmail.com',
      title: 'ba',
    }] as IProjectMember[];
    const setFinalSelectedList2 = jest.fn();
    const projectId = '2';
    render(
      <MemoryRouter initialEntries={['/project/2/new-message']}>
        <NotificationPicker
          projectId={projectId}
          finalSelectedList={finalSelectedList2}
          setFinalSelectedList={setFinalSelectedList2}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText('When I post this, 1 people will be notified')).toBeInTheDocument();
  });
});

describe('should display notification picker with more than one selected person', () => {
  it('should render notification picker section with more than 1 person are notified', async () => {
    const finalSelectedList3 = [{
      id: '1',
      name: 'user1',
      email: 'user1@gmail.com',
      title: 'ba',
    },
    {
      id: '2',
      name: 'user2',
      email: 'user2@gmail.com',
      title: 'dev',
    }] as IProjectMember[];
    const projectId = '3';

    const setFinalSelectedList3 = jest.fn();
    render(
      <MemoryRouter initialEntries={['/project/3/new-message']}>
        <NotificationPicker
          projectId={projectId}
          finalSelectedList={finalSelectedList3}
          setFinalSelectedList={setFinalSelectedList3}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText('When I post this, these 2 people will be notified')).toBeInTheDocument();
  });
});
