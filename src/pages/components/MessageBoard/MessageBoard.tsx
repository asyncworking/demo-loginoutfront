import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import * as apiUtils from '../../../utils/apiUtils';
import NavBar from '../../../components/NavBar/NavBar';
import MessageList from './components/MessageList/MessageList';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import useStyles from './MessageBoard.style';

const MessageBoard: React.FC = () => {
  const styles = useStyles();
  const { projectId } = useParams<{ projectId: string }>();

  const [projectName, setProjectName] = useState('');
  useEffect(() => {
    let isSubscribed = true;
    const fetchProjectById = async () => {
      const resp = await apiUtils.getProjectInfo(projectId);
      if (isSubscribed && resp.status === 200) {
        setProjectName(resp.data.name);
      }
    };
    fetchProjectById();
    return () => { isSubscribed = false; };
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
        <MessageList
          projectId={projectId}
        />
      </Paper>
    </div>
  );
};

export default MessageBoard;
