import { renderHook, act } from '@testing-library/react-hooks';
import useCheckboxStyle from '../hooks/useCheckboxStyle';
import TimeConverter from '../hooks/TimeConverter';
import useEditBtnStyles from '../components/TodoItemSection/useEditBtnStyles';

test('should return correct style when pass properties', () => {
  const { result } = renderHook(() => useCheckboxStyle({ completed: false, projectId: '1', todoItemId: '1', update: 1, setUpdate: '' }));
  expect(result.current.checkboxStyle).toBe('checkbox--false');
});

test('should return correct time format when pass the time', () => {
  const { result } = renderHook(() => TimeConverter());
  act(() => {
    result.current.refreshTime('2021-06-24T18:19:51.653494+10:00');
  });
  expect(result.current.timeDiff).toBeDefined();
});

test('should return style when call useEditBitStyles', () => {
  const aWidth = '80px'; const cWidth = '20px';
  const { result } = renderHook(() => useEditBtnStyles(aWidth, cWidth));
  expect(result.current.add).toBe('makeStyles-add-1');
  expect(result.current.cancel).toBe('makeStyles-cancel-2');
});
