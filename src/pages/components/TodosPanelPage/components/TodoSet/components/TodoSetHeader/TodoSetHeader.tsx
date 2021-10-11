import React from 'react';
import { Button, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import styles from './TodoSetHeader.module.scss';

const useStyles = makeStyles(() => createStyles({
  add: {
    width: '120px',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
}));

interface PropsType {
  todoLists: ITodoLists[];
  setAdd: any;
}

const TodoSetHeader = (props : PropsType) => {
  const { todoLists, setAdd } = props;
  const todoSetHeader = useStyles();

  const addNewList = () => {
    setAdd(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.head_title}>
        <h1>
          <span className={styles.head_name}>To-dos</span>
          <div className={styles.head_btnArea}>
            {todoLists.length === 0 ? null : (
              <Button
                className={todoSetHeader.add}
                variant="contained"
                color="primary"
                onClick={() => {
                  addNewList();
                }}
              >
                + New list
              </Button>
            )}
          </div>
        </h1>
      </div>
      <div className={styles.header__line} />
    </div>
  );
};

export default TodoSetHeader;
