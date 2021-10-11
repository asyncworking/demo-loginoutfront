import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import NavBar from 'src/components/NavBar/NavBar';
import ProjectProfile from './components/ProjectProfile/ProjectProfile';
import './EditProject.scss';

const EditProject = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const { projectId } = useParams<{ projectId: string }>();
  const goBack = () => {
    history.push(`/dashboard/projectpanel/${projectId}`);
  };

  const getProjName = (projName: string) => {
    setName(projName);
  };

  return (
    <div>
      <NavBar />
      <Paper
        className="goBack"
        elevation={3}
        onClick={() => {
          goBack();
        }}
      >
        <div className="icon">
          <div className="square">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="name">
            {name}
          </div>
        </div>
      </Paper>
      <Paper className="projectPanel" elevation={3}>
        <ProjectProfile getProjName={getProjName} />
      </Paper>
    </div>
  );
};
export default EditProject;
