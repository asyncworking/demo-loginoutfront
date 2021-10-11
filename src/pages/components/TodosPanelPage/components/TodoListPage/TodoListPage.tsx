/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb';
import * as apiUtils from 'src/utils/apiUtils';
import NavBar from 'src/components/NavBar/NavBar';
import TodoItems from './components/TodoItems/TodoItems';
import styles from './TodoListPage.module.scss';

const TodoListPage: React.FC = () => {
  const [update, setUpdate] = useState(0);
  const { projectId } = useParams<{ projectId: string }>();
  const { todolistId } = useParams<{ todolistId: string }>();
  const [projectName, setProjectName] = useState('');
  const [todolist, setTodolist] = useState({
    details: '',
    todoListTitle: '',
    originDetail: '',
    todoItems: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const projectResp = await apiUtils.getProjectInfo(projectId);
      const todoListResp = await apiUtils.fetchSingleTodoList({ projectId, todolistId });
      if (projectResp.status === 200 && todoListResp.status === 200) {
        setProjectName(projectResp.data.name);
        setTodolist({
          todoListTitle: todoListResp.data.todoListTitle,
          details: todoListResp.data.details,
          originDetail: todoListResp.data.originDetails,
          todoItems: todoListResp.data.todoItemGetDtos,
        });
      }
    };
    loadData();
  }, [projectId, todolistId, update]);

  const { todoListTitle, originDetail } = todolist;

  const directories = [{
    url: `/dashboard/projectpanel/${projectId}`,
    name: projectName,
  }];
  directories.push({ url: `/project/${projectId}/todolistset`, name: 'To-dos' });

  return (
    <div>
      <NavBar />
      <Breadcrumb directories={directories} />
      <Paper className={styles.mainPaper} elevation={3}>
        <header className={styles.todolist_header}>
          <h3>
            <span className={styles.todolist_title}>{todoListTitle}</span>
          </h3>
          <div className={styles.todolist_details}>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{ __html: originDetail }} />
          </div>
        </header>
        <TodoItems
          todoItems={todolist.todoItems}
          projectId={projectId}
          todolistId={todolistId}
          update={update}
          setUpdate={setUpdate}
        />
      </Paper>
    </div>
  );
};

export default TodoListPage;
