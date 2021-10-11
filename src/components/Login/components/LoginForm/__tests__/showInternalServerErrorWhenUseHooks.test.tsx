import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/ErrorMessages';
import { useLoginForm } from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const mock = new MockAdapter(axios);
const loginUrl = `${baseUrl}/login`;

mock.onPost(loginUrl).reply(500);

test('should show Internal Server error when use hooks', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginForm());

  act(() => {
    result.current.handleOnSubmit({ email: 'email@asyncworking.com', password: 'asyncworking111' });
  });
  await waitForNextUpdate();

  expect(result.current.warning.message).toBe(INTERNAL_SERVER_ERROR);
});
