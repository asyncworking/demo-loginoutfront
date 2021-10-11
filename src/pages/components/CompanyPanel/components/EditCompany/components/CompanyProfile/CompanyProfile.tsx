import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as apiUtils from 'src/utils/apiUtils';
import './CompanyProfile.scss';

interface IProps {
  getCompName: (compName: string) => void
}

const CompanyProfile: React.FC<IProps> = ({ getCompName }: IProps) => {
  const [compName, setCompName] = useState('');
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

  const companyId = localStorage.getItem('companyId');

  const update = async () => {
    const updateResponse = await apiUtils.updateCompanyProfile({ companyId, name: compName.trim(), description });
    if (updateResponse.status === 200) {
      history.push(`/dashboard/companypanel/${companyId}`);
    }
  };
  const saveChanges = (event: React.FormEvent) => {
    event.preventDefault();
    if (compName.trim().length === 0) {
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
    const response = await apiUtils.fetchCompanyProfile(companyId);
    if (response.status === 200) {
      const resp = response.data;
      getCompName(resp.name);
      setCompName(resp.name);
      setDescription(resp.description);
    }
  };
  useEffect(() => {
    prefill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const handleEdit = (event: ChangeEvent<HTMLTextAreaElement>, max: number) => {
    const val = event.target.value;
    const { name } = event.target;
    if (name === 'name') {
      if (val.trim().length <= max) {
        setNameWarning({
          shown: false,
          message: '',
        });
        setCompName(val);
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
        <h1>Edit details for this Company HQ</h1>
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
            value={compName}
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

export default CompanyProfile;
