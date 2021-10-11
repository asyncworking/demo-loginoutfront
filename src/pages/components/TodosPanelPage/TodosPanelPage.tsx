import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import NavBar from 'src/components/NavBar/NavBar';
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb';
import * as apiUtils from 'src/utils/apiUtils';
import TodoSet from './components/TodoSet/TodoSet';
import styles from './TodosPanelPage.module.scss';

const TodosPanelPage:React.FC = () => {
  const { projectId } = useParams<{ projectId:string }>();

  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    const fetchProjectById = async () => {
      const resp = await apiUtils.getProjectInfo(projectId);
      if (resp.status === 200) {
        setProjectName(resp.data.name);
      }
    };
    fetchProjectById();
    return () => {
      setProjectName('');
    };
  }, [projectId]);

  const directories = [{
    url: `/dashboard/projectpanel/${projectId}`,
    name: projectName,
  }];

  return (
    <div>
      <NavBar />
      <Breadcrumb directories={directories} />
      <Paper className={styles.mainPaper} elevation={3}>
        <TodoSet
          projectId={projectId}
        />
      </Paper>
    </div>
  );
};

export default TodosPanelPage;
