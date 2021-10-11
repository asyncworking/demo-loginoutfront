import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import SideBar from 'src/components/SideBar/SideBar';
import PeopleList from './components/PeopleList/PeopleList';
import CompanySideBarData from './components/SideBarData';
import styles from './CompanyPanel.module.scss';

const CompanyPanel = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    description: '',
  });

  const [employeeInfo, setEmployeeInfo] = useState({
    employeeList: [],
  });

  useEffect(() => {
    const getCompanyAndEmployeeInfo = async () => {
      const companyInfoResponse = await apiUtils.getCompanyInfo(companyId);
      const employeeInfoResponse = await apiUtils.getEmployeeInfo(companyId);
      if (companyInfoResponse.status === 200 && employeeInfoResponse.status === 200) {
        setCompanyInfo({
          companyName: companyInfoResponse.data.name,
          description: companyInfoResponse.data.description,
        });
        setEmployeeInfo({
          employeeList: employeeInfoResponse.data,
        });
      }
    };

    getCompanyAndEmployeeInfo();
  }, [companyId]);

  const { companyName, description } = companyInfo;
  const { employeeList } = employeeInfo;

  return (
    <Paper className={styles.companyPanel} elevation={3}>
      <SideBar SideBarData={CompanySideBarData} />
      <div className={styles.name}>{companyName}</div>
      <p className={styles.description}>{description}</p>
      <PeopleList employeeInfo={employeeList} />
    </Paper>
  );
};

export default CompanyPanel;
