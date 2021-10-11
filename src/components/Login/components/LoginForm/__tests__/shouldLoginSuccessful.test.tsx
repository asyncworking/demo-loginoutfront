import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useLoginForm } from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const mock = new MockAdapter(axios);
const loginUrl = `${baseUrl}/login`;
const companyUrl = `${baseUrl}/company`;
mock.onPost(loginUrl).reply(200, { id: 1, name: 's' });
mock.onGet(loginUrl, { params: { email: 'email@asyncworking.com' } }).reply(200);
mock.onGet(companyUrl, { params: { email: 'email@asyncworking.com' } }).reply(200, 1);
test('should login successful', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginForm());
  act(() => {
    result.current.handleOnSubmit({ email: 'email@asyncworking.com', password: 'asyncworking111' });
  });
  await waitForNextUpdate();

  expect(localStorage.getItem('userId')).toBe('1');
  expect(localStorage.getItem('name')).toBe('s');
  expect(localStorage.getItem('companyId')).toBe('1');
});
