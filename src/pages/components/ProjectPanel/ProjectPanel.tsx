import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Button, Grid, Theme, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import * as apiUtils from 'src/utils/apiUtils';
import SideBar, { SideBarData } from 'src/components/SideBar/SideBar';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon/UserProfileIcon';
import FunctionalPanel from './components/FunctionalPanel/FunctionalPanel';
import styles from './ProjectPanel.module.scss';
import IMessageItem from '../../../common/interfaces/IMessageItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    paddingTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
    buttom: '8px',
    width: '170px',
    fontSize: '0.75rem',
    marginTop: '3px',
    marginBottom: '3px',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
}));

const ProjectPanel = () => {
  const { projectId } = useParams<{ projectId: string }>();
  localStorage.setItem('projectId', projectId);
  const [todoInfo, setTodoInfo] = useState<ITodoLists[]>([] as ITodoLists[]);
  const [messageList, setMessageList] = useState<IMessageItem[]>([] as IMessageItem[]);
  const [isLoading, setIsLoading] = useState({
    message: true,
    todos: true,
    schedule: true,
    docFile: true,
  });
  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    description: '',
    projectUserNames: [],
  });

  useEffect(() => {
    const getProjectPanelInfo = async () => {
      const projectInfoResponse = await apiUtils.getProjectInfo(projectId);
      const todoInfoResponse = await apiUtils.fetchTodoLists(projectId, 3);
      const messageListResponse = await apiUtils.fetchMessageList(projectId);
      if (projectInfoResponse.status === 200 && todoInfoResponse.status === 200 && messageListResponse.status === 200) {
        setProjectInfo({
          projectName: projectInfoResponse.data.name,
          description: projectInfoResponse.data.description,
          projectUserNames: projectInfoResponse.data.projectUserNames,
        });
        setTodoInfo(todoInfoResponse.data);
        setMessageList(messageListResponse.data);
        setIsLoading({
          message: false,
          todos: false,
          schedule: false,
          docFile: false,
        });
      }
    };
    getProjectPanelInfo();
  }, [projectId]);

  const ProjectSideBarData: SideBarData[] = [
    {
      key: 1,
      title: 'Edit name, description, type',
      path: `/project/${projectId}/edit`,
      icon: <CreateIcon />,
    },
  ];

  const history = useHistory();

  const addPeopleBtn = () => {
    history.push(`/dashboard/projects/${projectId}/members`);
  };
  const { projectName, description, projectUserNames } = projectInfo;
  const projectPanelClasses = useStyles();
  return (
    <Paper className={styles.projectPanel} elevation={3} data-testid="goBack">
      <SideBar SideBarData={ProjectSideBarData} />
      <div data-testid="test-projectName" className={styles.name}>{projectName}</div>
      <p className={styles.description}>{description}</p>
      <Grid
        container
        direction="row"
        justify="center"
        className={projectPanelClasses.grid}
      >
        {projectUserNames.slice(0, 9).map((item: string) => (
          <div key={item} className={styles.projectUserNames}>
            <UserProfileIcon key={item} name={item} size="35" textSizeRatio={0} />
          </div>
        ))}
        <Button variant="outlined" onClick={addPeopleBtn} className={projectPanelClasses.button}>
          Add/remove people
        </Button>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        mt={3}
      >
        <FunctionalPanel
          projectId={projectId}
          todoInfo={todoInfo}
          messageList={messageList}
          isLoading={isLoading}
        />
      </Box>
    </Paper>
  );
};

export default ProjectPanel;
