import React from 'react';
import { Paper, Breadcrumbs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import styles from './Breadcrumb.module.scss';
import BreadcrumbLink from './components/BreadcrumbLink';

interface PropsType {
  directories: {
    url: string,
    name: string,
  }[];
}

const Breadcrumb = (props: PropsType) => {
  const { directories } = props;
  const history = useHistory();

  const goTo = (path: string) => {
    history.push(path);
  };

  return (
    <Paper
      className={styles.backgroundPaper}
      elevation={3}
      onClick={() => {
        goTo(directories[directories.length - 1].url);
      }}
    >
      <div className={styles.icon}>
        <div className={styles.square}>
          <div />
          <div />
          <div />
          <div />
        </div>
        <div />
        <Breadcrumbs separator={<NavigateNextRoundedIcon fontSize="small" />} aria-label="breadcrumb">
          {directories.map(({ url, name }) => (
            <BreadcrumbLink key={url} url={url} name={name} />
          ))}
        </Breadcrumbs>
      </div>
    </Paper>
  );
};

export default Breadcrumb;
