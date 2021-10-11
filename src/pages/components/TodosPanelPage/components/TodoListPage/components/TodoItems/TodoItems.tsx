import React, { useState } from 'react';
import ITodoItem from 'src/common/interfaces/Dto/Todo/TodoItem/ITodoItem';
import { Button, createStyles, makeStyles } from '@material-ui/core';
import TodoItemForm from './components/TodoItemForm/TodoItemForm';
import TodoItemUnit from './components/TodoItemUnit/TodoItemUnit';
import styles from './TodoItems.module.scss';

const useStyles = makeStyles(() => createStyles({
  addToDoItem: {
    width: '105px',
    fontSize: '0.7rem',
    color: '#000',
    borderRadius: '30px',
    textTransform: 'none',
    marginLeft: '45px',
  },
}));

interface PropsType {
  todoItems: ITodoItem[];
  projectId: string;
  todolistId: string
  update: any;
  setUpdate: any;
}

const TodoItems = (props: PropsType) => {
  const { todoItems, projectId, todolistId, update, setUpdate } = props;
  const todoItemDisplay = useStyles();
  const [expand, setExpand] = useState(false);
  const handleExpend = () => {
    setExpand(true);
  };
  const cancelExpend = () => {
    setExpand(false);
  };

  return (
    <ul className={styles.todoItem_remaining}>
      {todoItems.map((item) => (
        !item.completed ? <TodoItemUnit key={item.todoItemId} update={update} setUpdate={setUpdate} todoItem={item} /> : null))}
      <li className={styles.todoItem}>
        {expand
          ? (
            <div id={styles.todoItem_form}>
              <TodoItemForm
                cancelForm={cancelExpend}
                projectId={projectId}
                todolistId={todolistId}
                update={update}
                setUpdate={setUpdate}
              />
            </div>
          )
          : (
            <Button
              variant="outlined"
              className={todoItemDisplay.addToDoItem}
              onClick={handleExpend}
              id={styles.todoItem_form}
            >
              Add a to-do
            </Button>
          )}
      </li>
      {todoItems.map((item) => (
        item.completed ? <TodoItemUnit update={update} setUpdate={setUpdate} todoItem={item} /> : null))}
    </ul>
  );
};

export default TodoItems;
