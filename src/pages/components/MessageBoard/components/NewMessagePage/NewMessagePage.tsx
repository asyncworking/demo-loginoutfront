/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import NavBar from 'src/components/NavBar/NavBar';
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb';
import MessageForm from './components/MessageForm/MessageForm';
import useStyles from './NewMessagePage.style';

const NewMessagePage: React.FC = () => {
  const styles = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState('');
  const directories = [{
    url: `/dashboard/projectpanel/${projectId}`,
    name: projectName,
  }];
  directories.push({ url: `/project/${projectId}/messages`, name: 'Message Board' });

  const fetchProjectById = () => {
    apiUtils.getProjectInfo(projectId).then((response) => {
      if (response.status === 200) {
        setProjectName(response.data.name);
      }
    });
  };
  useEffect(() => {
    fetchProjectById();
  }, []);

  return (
    <div>
      <NavBar />
      <Breadcrumb directories={directories} />
      <Paper className={styles.mainPaper} elevation={3}>
        <MessageForm
          projectId={projectId}
        />
      </Paper>
    </div>
  );
};

export default NewMessagePage;
