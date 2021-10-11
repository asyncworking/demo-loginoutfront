import React, { useState } from 'react';
import { Button, createStyles, makeStyles, Container } from '@material-ui/core';
import styles from './PeopleList.module.scss';
import PeopleItem from './components/PeopleItem/PeopleItem';
import InvitationForm from './components/InvitationForm/InvitationForm';

const useStyles = makeStyles(() => createStyles({
  button: {
    width: '120px',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
}));

interface Props {
  employeeInfo: Employee[],
}
interface Employee {
  name: string,
  title: string,
  email: string
}

const PeopleList = ({ employeeInfo }: Props) => {
  const peopleListClasses = useStyles();
  const [active, setActive] = useState(false);

  const onShow = () => {
    setActive(true);
  };

  const onClose = () => {
    setActive(false);
  };

  employeeInfo.sort((a, b) => a.name.localeCompare(b.name, 'zh'));

  const employeeDisplay = employeeInfo ? employeeInfo.map((e: Employee) => <PeopleItem key={e.email} employee={e} />)
    : <div>no employee</div>;
  return (
    <Container>
      <div className={styles.peopleList}>
        <div className={styles.wrapper}>
          <div className={styles.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={peopleListClasses.button}
              onClick={onShow}
            >
              + Add people
            </Button>
          </div>
        </div>
        {active ? <InvitationForm closeForm={onClose} /> : null}
        <div className={styles.bottomContent}>
          {employeeDisplay}
        </div>
      </div>
    </Container>
  );
};

export default PeopleList;
