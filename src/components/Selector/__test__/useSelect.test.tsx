import { renderHook, act } from '@testing-library/react-hooks';
import useSelect from '../hooks/useSelect';

test('should open or close', () => {
  const setCategoryId = jest.fn();
  const { result } = renderHook(() => useSelect(setCategoryId));

  act(() => {
    result.current.handleSelect();
  });
  expect(result.current.isOpened).toBe(true);

  act(() => {
    result.current.handleSelect();
  });
  expect(result.current.isOpened).toBe(false);
});

test('should select None', () => {
  const setCategoryId = jest.fn();
  const { result } = renderHook(() => useSelect(setCategoryId));
  const mockEvent = { target: { innerText: 'None' } };
  const id = 'null';

  act(() => {
    result.current.handleSelected(mockEvent, id);
  });

  expect(result.current.value).toBe('Pick a category (optional)');
});

test('should select option', () => {
  const setCategoryId = jest.fn();
  const { result } = renderHook(() => useSelect(setCategoryId));
  const mockEvent = {
    target: { innerText: '📢 Announcement', attributes: { value: '1' } },
  };
  const id = '1';

  act(() => {
    result.current.handleSelected(mockEvent, id);
  });

  expect(result.current.value).toBe('📢 Announcement');
});
