import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import TodosPanelContent from './components/TodosPanelContent/TodosPanelContent';
import styles from './TodosPanelThumbnail.module.scss';

interface PropsTypes {
  todoInfo: ITodoLists[];
  isLoading: any;
}

const TodosPanelThumbnail = (props: PropsTypes) => {
  const { todoInfo, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <span className={styles.loading}><CircularProgress color="primary" /></span>
      ) : (
        <TodosPanelContent todoInfo={todoInfo} />
      )}
    </>
  );
};

export default TodosPanelThumbnail;
