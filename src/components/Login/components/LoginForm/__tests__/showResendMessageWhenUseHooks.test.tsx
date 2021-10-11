import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useLoginForm } from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
const user = {
  id: 1,
  email: 'email@asyncworking.com',
  name: 'Chui',
  accessToken: '123' };
const mock = new MockAdapter(axios);
const loginUrl = `${baseUrl}/login`;

mock.onPost(loginUrl).reply(200, user);
mock.onGet(loginUrl).reply(203);

test('should return correct resend message', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginForm());

  act(() => {
    result.current.handleOnSubmit({ email: 'email@asyncworking.com', password: 'asyncworking111' });
  });
  await waitForNextUpdate();

  expect(result.current.resendMessage.shown).toBe(true);
  expect(localStorage.getItem('email')).toBe('email@asyncworking.com');
});
