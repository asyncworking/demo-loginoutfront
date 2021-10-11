import { useEffect, useState } from 'react';
import * as apUtils from 'src/utils/apiUtils';

interface PropTypes {
  completed: boolean,
  projectId: string,
  todoItemId: string,
  update: any,
  setUpdate: any,
}

const useCheckboxStyle = ({ completed, projectId, todoItemId, update, setUpdate }: PropTypes) => {
  const [checkboxStyle, setCheckboxStyle] = useState('checkbox--false');
  const [hideImage, setHideImage] = useState(!completed);
  useEffect(() => {
    setCheckboxStyle(completed ? 'checkbox--true' : 'checkbox--false');
    setHideImage(!completed);
  }, [completed]);
  const mouseDown = () => {
    if (completed) {
      setCheckboxStyle('checkbox--dark');
      setHideImage(false);
    } else {
      setCheckboxStyle('checkbox--grey');
      setHideImage(true);
    }
  };

  const mouseUp = () => {
    setHideImage(false);
    setCheckboxStyle('checkbox--pending');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    updateCompleted();
  };

  const updateCompleted = async () => {
    const res = await apUtils.changeTodoItemCompletedStatus({ projectId, todoItemId });
    if (res.status === 200) {
      setUpdate(update + 1);
      const style = res.data ? 'checkbox--true' : 'checkbox--false';
      setCheckboxStyle(style);
      setHideImage(!res.data);
    } else {
      setCheckboxStyle(completed ? 'checkbox--true' : 'checkbox--false');
      setHideImage(!completed);
    }
  };
  return { mouseUp, mouseDown, checkboxStyle, hideImage };
};
export default useCheckboxStyle;
