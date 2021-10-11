import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as apiUtils from 'src/utils/apiUtils';
import MessageForm from '../components/NewMessagePage/components/MessageForm/MessageForm';

describe('<MessageForm />', () => {
  const projectId = '1';

  it('should warn given title reach limited length', () => {
    const { getByTestId } = render(<MessageForm projectId={projectId} />);
    fireEvent.change(getByTestId('title'), {
      target: { value: new Array(260).join('a') },
    });
    expect(getByTestId('warning').textContent).toBe('Message Title has reached the limit of 255 characters.');
  });

  it('should display Untitled given null input', () => {
    const { getByTestId } = render(<MessageForm projectId={projectId} />);
    const mockCreateMessage = jest.spyOn(apiUtils, 'createMessage');
    const postButton = getByTestId('postButton');
    fireEvent.click(postButton);
    expect(mockCreateMessage).toBeCalledWith({ companyId: null, html: '', messageCategoryId: null, messageTitle: 'Untitled', posterUserId: null, projectId: '1', subscribersIds: null, text: '' });
  });

  it('should display Title given valid title', () => {
    const { getByTestId } = render(<MessageForm projectId={projectId} />);
    const mockCreateMessage = jest.spyOn(apiUtils, 'createMessage');
    const postButton = getByTestId('postButton');
    fireEvent.change(getByTestId('title'), {
      target: { value: 'Title' },
    });
    fireEvent.click(postButton);
    expect(mockCreateMessage).toBeCalledWith({ companyId: null, html: '', messageCategoryId: null, messageTitle: 'Title', posterUserId: null, projectId: '1', subscribersIds: null, text: '' });
  });
});
