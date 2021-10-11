import React from 'react';
import {
  Box,
  Divider,
  Typography,
  Card,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './FunctionalPanelItem.module.scss';

interface PanelTypes {
  title: string;
  link: string;
  display: any;
}

const FunctionalPanelItem = (props: PanelTypes) => {
  const history = useHistory();
  const { title, link, display } = props;
  const jump = () => {
    history.push(link);
  };

  return (
    <Box
      className="container"
      p={3}
      onClick={jump}
    >
      <Card
        className={styles.root}
        variant="outlined"
      >
        <Typography variant="h5" component="h2" align="center">
          {title}
        </Typography>
        <Divider variant="middle" />
        <section className={styles.divider}>
          {display}
        </section>
      </Card>
    </Box>
  );
};

export default FunctionalPanelItem;
