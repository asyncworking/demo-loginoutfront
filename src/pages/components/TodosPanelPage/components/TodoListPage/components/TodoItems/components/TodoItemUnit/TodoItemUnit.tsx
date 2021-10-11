import React from 'react';
import ITodoItem from 'src/common/interfaces/Dto/Todo/TodoItem/ITodoItem';
import DehazeIcon from '@material-ui/icons/Dehaze';
import TodayIcon from '@material-ui/icons/Today';
import { Link } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import markAsDone from 'src/assets/svgs/markAsDone.svg';
import './TodoItemUnit.scss';
import useCheckboxStyle from 'src/pages/components/TodosPanelPage/components/TodoItemPage/hooks/useCheckboxStyle';

interface PropTypes {
  todoItem:ITodoItem,
  update:number,
  setUpdate:any
}

const TodoItemUnit: React.FC<PropTypes> = ({ todoItem, update, setUpdate }:PropTypes) => {
  const { todoItemId, projectId, description, notes, completed, dueDate } = todoItem;
  const { mouseUp, mouseDown, checkboxStyle, hideImage } = useCheckboxStyle({ completed, projectId, todoItemId, update, setUpdate });
  const changedDateForm = () => {
    const dateStrArr = new Date(dueDate.slice(0, 25)).toString().split(' ');
    const thisYear = new Date().getFullYear().toString();
    if (dateStrArr[3] === thisYear) {
      return `${dateStrArr[0]}, ${dateStrArr[1]} ${dateStrArr[2]}`;
    }
    return `${dateStrArr[0]}, ${dateStrArr[1]} ${dateStrArr[2]},  ${dateStrArr[3]}`;
  };
  return (
    <li key={todoItemId} className="todoItem">
      <div className="indent">
        <span className="todoItem_drag_handle">
          {completed ? null : <DehazeIcon />}
        </span>
        <div className="checkbox">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <label
            htmlFor="checkbox"
            className="checkbox__label"
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          >
            <span className={checkboxStyle}>
              <img src={markAsDone} alt="" className={hideImage ? 'img--hide' : undefined} />
            </span>
          </label>
          <span className="checkbox_content">
            <Link to={`/project/${projectId}/todoitems/${todoItemId}`} className="todoItem_description">{description}</Link>
            <Link to={`/project/${projectId}/todoitems/${todoItemId}`} className="todoItem_notes">{notes.length > 0 && <NoteIcon />}</Link>
            {dueDate != null && dueDate.length > 0 ? (
              <div className="todoItem_date_icon">
                <TodayIcon />
                <div className="todoItem_date">
                  {changedDateForm()}
                </div>
              </div>
            ) : null}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItemUnit;
