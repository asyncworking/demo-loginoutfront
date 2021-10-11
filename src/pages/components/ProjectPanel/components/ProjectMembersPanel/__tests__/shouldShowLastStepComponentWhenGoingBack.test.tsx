import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';
import ProjectMembersPanel from '../ProjectMembersPanel';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('GoBack', () => {
  it('Redirects to correct URL on click', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/dashboard/projects/2/members']}>
        <ProjectMembersPanel />
      </MemoryRouter>,
    );
    act(() => {
      fireEvent.click(getByTestId('goBack'));
    });
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard/projectpanel/null');
  });
});
