import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { USERNAME_PASSWORD_MISMATCH_ERROR } from 'src/common/constants/ErrorMessages';
import { useLoginForm } from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const mock = new MockAdapter(axios);
const loginUrl = `${baseUrl}/login`;
mock.onPost(loginUrl).reply(401);

test('should return correct resend message', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginForm());

  act(() => {
    result.current.handleOnSubmit({ email: 'email@asyncworking.com', password: 'asyncworking111' });
  });
  await waitForNextUpdate();

  expect(result.current.warning.message).toBe(USERNAME_PASSWORD_MISMATCH_ERROR);
});
