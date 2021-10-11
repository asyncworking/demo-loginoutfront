import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRegisterForm } from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const mock = new MockAdapter(axios);
const decodeUrl = `${baseUrl}/invitations/info`;
const submitUrl = `${baseUrl}/invitations/register`;

const code = 'code';

test('should login by invitation fail', async () => {
  mock.onGet(decodeUrl, { params: { code } }).reply(200, {
    companyId: '1',
    email: 'email',
    name: '测试122',
    title: '1',
  });
  mock.onPost(submitUrl).reply(500);
  const { result, waitForNextUpdate } = renderHook(() => useRegisterForm(code));
  act(() => {
    result.current.fetchDataFromInvitationLink();
    result.current.handleOnSubmit({ name: 'name', email: 'email', password: 'password' });
  });
  await waitForNextUpdate();

  expect(localStorage.getItem('userId')).toBe(null);
});

test('should login by invitation successfully', async () => {
  mock.onGet(decodeUrl, { params: { code } }).reply(200, {
    companyId: '1',
    companyName: 'companyName',
    email: 'email',
    name: '测试122',
    title: '1',
  });
  mock.onPost(submitUrl).reply(200, {
    id: 1,
    name: 'name',
    email: 'user1@gmail.comd2xx',
  });
  const { result, waitForNextUpdate } = renderHook(() => useRegisterForm(code));
  act(() => {
    result.current.fetchDataFromInvitationLink();
    result.current.handleOnSubmit({ name: 'name', email: 'email', password: 'password' });
  });
  await waitForNextUpdate();

  expect(localStorage.getItem('userId')).toBe('1');
  expect(result.current.initialValues.email).toBe('email');
  expect(result.current.companyName).toBe('companyName');
});
