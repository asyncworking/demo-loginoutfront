import * as React from 'react';
import { Link } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import ITodoItem from 'src/common/interfaces/Dto/Todo/TodoItem/ITodoItem';
import todo from 'src/assets/svgs/todo.svg';
import InitialPanelThumbnail from '../../../InitialPanelThumbnail/InitialPanelThumbnail';
import styles from './TodosPanelContent.module.scss';

interface PropsTypes {
  todoInfo: ITodoLists[];
}

const TodosPanelContent = (props: PropsTypes) => {
  const { todoInfo } = props;
  const description = 'Make lists of work that needs to get done, assign items, set due dates, and discuss.';

  if (todoInfo.length === 0) {
    return <InitialPanelThumbnail svg={todo} description={description} />;
  }

  return (
    <ul className={styles.todolist}>
      {todoInfo.slice(0, 5).map((todoList: ITodoLists) => (
        <li key={todoList.id}>
          <h3 className={styles.todolist_title}>
            {todoList.todoListTitle}
          </h3>
          <>
            <ul className={styles.todoItem_remaining}>
              {todoList.todoItemGetDtos.filter((todoItem) => !todoItem.completed).slice(0, 5)
                .map((todoItem: ITodoItem) => (
                  <li
                    key={todoItem.todoItemId}
                    className={styles.todoItem}
                  >
                    <div className={styles.indent}>
                      <div className={styles.checkbox}>
                        <label htmlFor="checkbox" className={styles.checkbox_label}>
                          <input type="checkbox" className={styles.checkbox_input} />
                          <span className={styles.checkbox_button} />
                        </label>
                        <span className={styles.checkbox_content}>
                          <Link to="/" className={styles.todoItem_description}>{todoItem.description}</Link>
                          <Link to="/" className={styles.todoItem_notes}>{todoItem.notes.length > 0 && <NoteIcon />}</Link>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        </li>
      ))}
    </ul>
  );
};

export default TodosPanelContent;
