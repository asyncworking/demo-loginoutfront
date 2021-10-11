import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MessageHeader from '../components/MessageList/components/MessageHeader/MessageHeader';

describe('<MessageHeader />', () => {
  const history = createMemoryHistory();
  const mockPush = jest.spyOn(history, 'push');
  const projectId = '1';
  it('should jump to NewMessage Page', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <MessageHeader projectId={projectId} />
      </Router>,
    );
    const button = getByTestId('new-message-button');
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toBeCalledWith(`/project/${projectId}/new-message`);
  });
});
