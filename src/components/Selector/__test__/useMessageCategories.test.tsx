import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { fetchMessageCategoryList } from 'src/utils/Message/messageApiUtils';
import MockAdapter from 'axios-mock-adapter';
import useMessageCategories from '../hooks/useMessageCategories';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

test('should get categories data', async () => {
  const mock = new MockAdapter(axios);

  const mockData = [
    {
      messageCategoryId: '1',
      projectId: 1,
      categoryName: 'Announcement',
      emoji: '📢',
    },
  ];
  const url = `${baseUrl}/projects/1/message-categories`;
  mock.onGet(url).reply(200, mockData);

  const { result, waitForNextUpdate } = renderHook(() => useMessageCategories('1'));

  expect(result.current).toEqual([]);

  fetchMessageCategoryList('1');
  await waitForNextUpdate();

  expect(result.current).toEqual(mockData);
});

test('returns initial value on network error', async () => {
  const mock = new MockAdapter(axios);

  const url = `${baseUrl}/projects/1/message-categories`;
  mock.onGet(url).networkError();

  const { result, waitForNextUpdate } = renderHook(() => useMessageCategories('1'));

  expect(result.current).toEqual([]);

  fetchMessageCategoryList('1');
  waitForNextUpdate();

  expect(result.current).toEqual([]);
});
