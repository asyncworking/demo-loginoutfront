/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Link } from 'react-router-dom';
import removeMd from 'remove-markdown';
import styles from './TodoLists.module.scss';
import TodoItems from '../../../TodoListPage/components/TodoItems/TodoItems';

interface PropsType {
  projectId: string;
  todoLists: ITodoLists[];
  update: number;
  setUpdate: any;
}

const TodoLists = (props: PropsType) => {
  const { projectId, todoLists, update, setUpdate } = props;

  return (
    <>
      <ul className={styles.todoLists}>
        {todoLists.map((todoList: ITodoLists) => (
          <li
            key={todoList.id}
            className={styles.todoList_map}
          >
            <header>
              <span>
                <DehazeIcon className={styles.map_drag} />
              </span>
              <h3 className={styles.title}>
                <Link to={`/project/${projectId}/todolists/${todoList.id}`}>
                  <span className={styles.map_name}>
                    {todoList.todoListTitle}
                  </span>
                </Link>
              </h3>
              <div className={styles.map_details}>
                <Link to={`/project/${projectId}/todolists/${todoList.id}`} className={styles.map_color}>
                  {todoList.details ? (removeMd(todoList.details)) : null}
                </Link>
              </div>
            </header>
            <TodoItems
              todoItems={todoList.todoItemGetDtos}
              projectId={projectId}
              todolistId={todoList.id}
              update={update}
              setUpdate={setUpdate}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoLists;
