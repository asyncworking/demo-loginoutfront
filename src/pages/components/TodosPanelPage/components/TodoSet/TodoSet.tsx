import React, { useEffect, useState } from 'react';
import * as apiUtils from 'src/utils/apiUtils';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import TodoSetHeader from './components/TodoSetHeader/TodoSetHeader';
import TodoListForm from './components/TodoListForm/TodoListForm';
import TodoLists from './components/TodoLists/TodoLists';

interface IProjectId {
  projectId: string,
}

const TodoSet = ({ projectId }:IProjectId) => {
  const [update, setUpdate] = useState<number>(0);
  const [todoLists, setTodoLists] = useState<ITodoLists[]>([] as ITodoLists[]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTodoLists = async () => {
    if (projectId !== null) {
      const resp = await apiUtils.fetchTodoLists(projectId, 50);
      if (resp.status === 200) {
        setTodoLists(resp.data);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchTodoLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, update]);

  return (
    <div>
      <TodoSetHeader
        todoLists={todoLists}
        setAdd={setIsAdded}
      />
      {isLoading
        || (
        <>
          {(todoLists.length === 0 || isAdded) && (
          <TodoListForm
            projectId={projectId}
            setIsAdded={setIsAdded}
            todoLists={todoLists}
          />
          )}
        </>
        )}
      <TodoLists
        projectId={projectId}
        todoLists={todoLists}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default TodoSet;
