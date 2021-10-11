import React from 'react';
import { Button, Container } from '@material-ui/core';
import styles from './ProjectMembers.module.scss';
import useShowAndClose from './hooks';
import useStyles from './ProjectMembers.style';
import ProjectMember from './components/ProjectMember/ProjectMember';
import ProjectInvitation from './components/ProjectInvitation/ProjectInvitation';

interface Props {
  membersInfo: Member[],
  getMembers: Function,
}

interface Member {
  name: string,
  title: string,
  email: string
}

const ProjectMembers = ({ membersInfo, getMembers }: Props) => {
  const { active, onShow, onClose } = useShowAndClose();
  const classes = useStyles();

  const memberDisplay = membersInfo ? membersInfo.map((e: any) => <ProjectMember key={e.email} member={e} />)
    : <div>No Project Members</div>;
  return (
    <Container>
      <div className={classes.peopleList}>
        <div className={styles.wrapper}>
          <div className={styles.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.root}
              data-testid="addPeople"
              onClick={onShow}
            >
              + Add people
            </Button>
          </div>
        </div>
        {active ? <ProjectInvitation closeForm={onClose} getMembers={getMembers} /> : null}
        <div className={classes.bottomContent}>
          {memberDisplay}
        </div>
      </div>
    </Container>
  );
};

export default ProjectMembers;
