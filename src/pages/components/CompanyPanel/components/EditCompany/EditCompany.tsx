import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import NavBar from 'src/components/NavBar/NavBar';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import './EditCompany.scss';

const EditCompany = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const companyId = localStorage.getItem('companyId');
  const goBack = () => {
    history.push(`/dashboard/companypanel/${companyId}`);
  };

  const getCompName = (compName:string) => {
    setName(compName);
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
      <Paper className="companyPanel" elevation={3}>
        <CompanyProfile getCompName={getCompName} />
      </Paper>
    </div>
  );
};
export default EditCompany;
