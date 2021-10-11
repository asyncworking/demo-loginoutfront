import React from 'react';
import {
  Typography,
  Grid,
  Theme,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import styles from './InitialPanelThumbnail.module.scss';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    padding: theme.spacing(4),
  },
}));

const InitialPanelDisplay = (props: any) => {
  const { svg, description } = props;
  const InitialPanelClasses = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={InitialPanelClasses.grid}
      >
        <img src={svg} alt={svg} className={styles.logo} />
        <Typography variant="subtitle1" color="textSecondary" className={styles.description}>
          {description}
        </Typography>
      </Grid>

    </>
  );
};

export default InitialPanelDisplay;
