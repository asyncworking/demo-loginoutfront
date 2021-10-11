import React from 'react';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import useStyles from './ProjectMember.style';
import styles from './ProjectMember.module.scss';

interface Props {
  member: {
    name: string,
    title: string,
    email: string
  }
}

const ProjectMember = ({ member }: Props) => {
  const classes = useStyles();
  const { name, title, email } = member;
  return (
    <div className={styles.cardWrapper} data-testid="member">
      <div className={classes.icon}>
        <UserProfileIcon name={name} size="50" textSizeRatio={2} />
      </div>
      <div>
        <div className={classes.name}>{name}</div>
        <div className={classes.companyName}>{title}</div>
        <div className={classes.email}>{email}</div>
      </div>
    </div>
  );
};

export default ProjectMember;
