import { renderHook, act } from '@testing-library/react-hooks';
import useShowAndClose from '../hooks/index';

test('should show the invitation when triggered', () => {
  const { result } = renderHook(() => useShowAndClose());
  act(() => {
    result.current.onClose();
  });
  expect(result.current.active).toBe(false);
  act(() => {
    result.current.onShow();
  });
  expect(result.current.active).toBe(true);
});
