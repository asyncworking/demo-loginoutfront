import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box, Button,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import * as apiUtils from 'src/utils/apiUtils';
import './ProjectProfile.scss';

interface IProps {
  getProjName: (projName: string) => void
}

const ProjectProfile: React.FC<IProps> = ({ getProjName } : IProps) => {
  const [projName, setProjName] = useState('');
  const [description, setDescription] = useState('');

  const [nameWarning, setNameWarning] = useState({
    shown: false,
    message: '',
  });

  const [descWarning, setDescWarning] = useState({
    shown: false,
    message: '',
  });

  const nameRef = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();

  const { projectId } = useParams<{ projectId: string }>();

  const update = async () => {
    const updateResponse = await apiUtils.updateProjectProfile({ projectId, name: projName.trim(), description });
    if (updateResponse.status === 200) {
      history.push(`/dashboard/projectpanel/${projectId}`);
    }
  };
  const saveChanges = (event: React.FormEvent) => {
    event.preventDefault();
    if (projName.trim().length === 0) {
      setNameWarning({
        shown: true,
        message: 'Name is required',
      });
      nameRef.current?.focus();
      return;
    }
    update();
  };

  const prefill = async () => {
    const response = await apiUtils.getProjectInfo(projectId);
    if (response.status === 200) {
      const resp = response.data;
      getProjName(resp.name);
      setProjName(resp.name);
      setDescription(resp.description);
    }
  };
  useEffect(() => {
    prefill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleEdit = (event: ChangeEvent<HTMLTextAreaElement>, max: number) => {
    const val = event.target.value;
    const { name } = event.target;
    if (name === 'name') {
      if (val.trim().length <= max) {
        setNameWarning({
          shown: false,
          message: '',
        });
        setProjName(val);
      } else {
        setNameWarning({
          shown: true,
          message: 'Name cannot exceed 128 characters',
        });
      }
    }
    if (name === 'description') {
      if (val.length <= max) {
        setDescWarning({
          shown: false,
          message: '',
        });
        setDescription(val);
      } else {
        setDescWarning({
          shown: true,
          message: 'description cannot exceed 1024 characters',
        });
      }
    }
  };

  return (
    <div className="profile">
      <div className="header">
        <h1>Edit details for this Project</h1>
        <div className="header__line" />
      </div>
      <form
        onSubmit={(event: React.FormEvent) => {
          saveChanges(event);
        }}
      >
        <div className="inputContainer">
          <label htmlFor="name"><h3>Name</h3></label>
          <textarea
            className="profileBox"
            name="name"
            rows={1}
            ref={nameRef}
            onChange={(event) => {
              handleEdit(event, 128);
            }}
            value={projName}
          />
          {nameWarning.shown ? <span className="errorMessage">{nameWarning.message}</span> : <span />}
        </div>
        <div className="inputContainer">
          <label htmlFor="description"><h3>Description(optional)</h3></label>
          <textarea
            className="profileBox"
            name="description"
            rows={3}
            onChange={(event) => {
              handleEdit(event, 1024);
            }}
            value={description}
          />
          {descWarning.shown ? <span className="errorMessage">{descWarning.message}</span> : <span />}
        </div>
        <Box
          className="subBtn"
        >
          <Button
            className="btn"
            type="submit"
            variant="contained"
            color="primary"
          >
            Save changes
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProjectProfile;
