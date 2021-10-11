import React from 'react';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon/UserProfileIcon';
import useStyles from './AvailableEmployee.style';

interface Props {
  employee: {
    id: number,
    name: string,
    title: string,
    email: string
  }
}

const AvailableEmployee = ({ employee }: Props) => {
  const { name } = employee;
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <div className={classes.icon}>
          <UserProfileIcon name={name} size="50" textSizeRatio={2} />
        </div>
        <div>
          <div className={classes.name}>{name}</div>
        </div>
      </div>
    </div>
  );
};

export default AvailableEmployee;
