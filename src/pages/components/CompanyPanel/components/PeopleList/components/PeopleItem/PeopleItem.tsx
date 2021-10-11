import React from 'react';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import styles from './PeopleItem.module.scss';

interface Props {
  employee: {
    name: string,
    title: string,
    email: string
  }
}

const PeopleItem = ({ employee }:Props) => {
  const { name, title, email } = employee;
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.icon}>
        <UserProfileIcon name={name} size="50" textSizeRatio={2} />
      </div>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.companyName}>{title}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
};

export default PeopleItem;
