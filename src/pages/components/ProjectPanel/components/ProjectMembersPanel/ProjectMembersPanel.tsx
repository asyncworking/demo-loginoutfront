import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import getProjectMembersInfo from 'src/utils/apiProjectMembersPanel';
import useProjectMembersInfo from './hooks/useProjectMembersInfo';
import ProjectMembers from './components/PorjectMembers/ProjectMembers';
import useStyles from './ProjectMembersPanel.style';
import styles from './ProjectMembersPanel.module.scss';

const ProjectMembersPanel: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const projectId = localStorage.getItem('projectId');
  const goBack = () => {
    history.push(`/dashboard/projectpanel/${projectId}`);
  };

  const { membersInfo, setMembersInfo, projectInfo, setProjectInfo } = useProjectMembersInfo();

  const getProjectInfo = async () => {
    const projectInfoResponse = await apiUtils.getProjectInfo(projectId);
    if (projectInfoResponse.status === 200) {
      setProjectInfo({
        projectName: projectInfoResponse.data.name,
        description: projectInfoResponse.data.description,
        projectUserNames: projectInfoResponse.data.projectUserNames,
      });
    }
  };

  const getMembersInfo = async () => {
    const membersInfoResponse = await getProjectMembersInfo(projectId);
    if (membersInfoResponse.status === 200) {
      setMembersInfo({
        membersList: membersInfoResponse.data,
      });
    }
  };

  useEffect(() => {
    getMembersInfo();
    getProjectInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { membersList } = membersInfo;

  return (
    <div>
      <Paper
        className={styles.goBack}
        elevation={3}
        square
        data-testid="goBack"
        onClick={() => {
          goBack();
        }}
      >
        <div className={classes.icon}>
          <div className={classes.square}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className={classes.linkName}>
            {projectInfo.projectName}
          </div>
        </div>
      </Paper>

      <Paper className={styles.mainPaper} elevation={5} square>
        <div className={classes.name} data-testid="name">{projectInfo.projectName}</div>
        <p className={classes.description}>{projectInfo.description}</p>
        <ProjectMembers membersInfo={membersList} getMembers={getMembersInfo} />
      </Paper>
    </div>
  );
};

export default ProjectMembersPanel;
