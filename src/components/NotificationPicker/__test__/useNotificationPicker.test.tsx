import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { fetchProjectMemberList } from 'src/utils/apiUtils';
import MockAdapter from 'axios-mock-adapter';
import useNotificationPicker from '../hooks';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

const setItemMock = jest.fn();
const getItemMock = jest.fn();

beforeEach(() => {
  Storage.prototype.setItem = setItemMock;
  Storage.prototype.getItem = getItemMock;
});

afterEach(() => {
  setItemMock.mockRestore();
  getItemMock.mockRestore();
});

test('should open or close', () => {
  const projectId = '1';
  const { result } = renderHook(() => useNotificationPicker(projectId));

  act(() => {
    result.current.togglePopUp();
  });
  expect(result.current.popUpState).toBe(true);

  act(() => {
    result.current.togglePopUp();
  });
  expect(result.current.popUpState).toBe(false);
});

test('should get selectable member list', async () => {
  const mock = new MockAdapter(axios);

  const mockData = [{
    id: '1',
    name: 'user1',
    email: 'user1@gmail.com',
    title: 'ba',
  },
  {
    id: '2',
    name: 'user2',
    email: 'user2@gmail.com',
    title: null,
  },
  {
    id: '3',
    name: 'user3',
    email: 'user3@gmail.com',
    title: null,
  },
  {
    id: '4',
    name: 'user4',
    email: 'user4@gmail.com',
    title: null,
  }];

  const url = `${baseUrl}/projects/1/members`;
  mock.onGet(url).reply(200, mockData);
  const { result, waitForNextUpdate } = renderHook(() => useNotificationPicker('1'));

  expect(result.current.selectableMemberList).toEqual([]);
  fetchProjectMemberList('1');
  await waitForNextUpdate();

  expect(result.current.selectableMemberList).toEqual(mockData);
});

it('fetches something from localStorage', () => {
  getItemMock.mockReturnValue('1');
  renderHook(() => useNotificationPicker('1'));
  expect(getItemMock).toHaveBeenCalled();
});
