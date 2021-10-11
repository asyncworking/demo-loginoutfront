/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Button, Link } from '@material-ui/core';
import * as apiUtils from 'src/utils/apiUtils';
import * as apiProjectInvitation from 'src/utils/apiProjectInvitation';
import styles from './ProjectInvitation.module.scss';
import useStyles from './ProjectInvitation.style';
import useEmployeesSelection from './hooks';
import AvailableEmployeesList from './components/AvailableEmployeesList/AvailableEmployeesList';

const ProjectInvitation = ({ closeForm, getMembers }: any) => {
  const classes = useStyles();

  const { companyInfo, setCompanyInfo, employeeInfo, setEmployeeInfo, selectAll, selectNone, ids, setIds } = useEmployeesSelection();

  const companyId = localStorage.getItem('companyId');

  const projectId = localStorage.getItem('projectId');

  const getAvailableEmployeesInfo = async () => {
    const companyInfoResponse = await apiUtils.getCompanyInfo(companyId);
    const employeeInfoResponse = await apiProjectInvitation.getAvailableEmployees(companyId, projectId);
    if (companyInfoResponse.status === 200) {
      setCompanyInfo({
        companyName: companyInfoResponse.data.name,
        description: companyInfoResponse.data.description,
      });
    }
    if (employeeInfoResponse.status === 200) {
      setEmployeeInfo({
        employeeList: employeeInfoResponse.data,
      });
    }
  };

  const { employeeList } = employeeInfo;

  useEffect(() => {
    getAvailableEmployeesInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = (
    closeForm
  );

  const addPeople = async () => {
    const found = ids.some((e: any) => e.checked === true);
    const employeeIds = ids.filter((e: any) => e.checked === true).map((e: any) => e.id).toString();
    const addProjectsMembers = await apiProjectInvitation.addProjectsMembers(projectId, employeeIds);
    if (!found) {
      onClose();
    }
    if (addProjectsMembers.status === 200) {
      getMembers();
      onClose();
    }
  };

  return (
    <div className={styles.projectinvitation__container}>
      <div className={styles.projectinvitation__form}>
        <div className={styles.projectinvitation__title}>
          Pick people from &nbsp;
          {companyInfo.companyName}
        </div>
        <div className={styles.projectinvitation__selectbar}>
          <Link data-testid="selectAll" onClick={() => selectAll()} className={classes.selectBtn}>
            Select everyone
          </Link>
          <div className={styles.projectinvitation__seperatordot}></div>
          <Link data-testid="selectNone" onClick={selectNone} className={classes.selectBtn}>
            Select no one
          </Link>
        </div>
        <div>
          <AvailableEmployeesList employeeInfo={employeeList} ids={ids} setIds={setIds} />
        </div>
        <hr />
        <div className={styles.projectinvitation__buttoncontainer}>
          <Button data-testid="addSelectedPeople" variant="contained" onClick={addPeople} color="primary" className={classes.addBtn}>
            Add selected people
          </Button>

          <Button variant="outlined" onClick={onClose} className={classes.cancelBtn}>
            Never mind
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInvitation;
