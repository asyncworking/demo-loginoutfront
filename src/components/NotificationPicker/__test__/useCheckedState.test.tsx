import { renderHook, act } from '@testing-library/react-hooks';
import useCheckedState from '../components/NotificationPopUp/components/SelectablePerson/hooks';

test('check state when selected list include member', () => {
  const setSelectedList = jest.fn();

  const member = {
    id: '2',
    name: 'user2',
    email: 'user2@gmail.com',
    title: null,
  };

  const selectedList = [
    member,
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
      title: 'dev',
    }];

  const mockSelectedList = [{
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
    title: 'dev',
  }];
  const { result } = renderHook(() => useCheckedState(member, selectedList, setSelectedList));

  act(() => {
    result.current.handleClick();
  });
  expect(result.current.selectedList).toStrictEqual(mockSelectedList);
});

test('check state selected list does not include member', () => {
  const setSelectedList = jest.fn();

  const member = {
    id: '5',
    name: 'user5',
    email: 'user5@gmail.com',
    title: null,
  };

  const selectedList = [{
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
    title: 'dev',
  }];

  const mockSelectedList = [{
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
    title: 'dev',
  }];
  const { result } = renderHook(() => useCheckedState(member, selectedList, setSelectedList));

  act(() => {
    result.current.handleClick();
  });
  expect(result.current.selectedList).toStrictEqual(mockSelectedList);
});
