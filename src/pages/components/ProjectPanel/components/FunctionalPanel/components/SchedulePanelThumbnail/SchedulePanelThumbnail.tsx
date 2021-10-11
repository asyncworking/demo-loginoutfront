import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import schedule from 'src/assets/svgs/schedule.svg';
import InitialPanelThumbnail from '../InitialPanelThumbnail/InitialPanelThumbnail';
import styles from './SchedulePanelThumbnail.module.scss';

const SchedulePanelThumbnail = (props: any) => {
  const { isLoading } = props;
  const description = 'Set important dates on a shared schedule. Subscribe to events in Google Cal, iCal, or Outlook.';
  return (
    <>
      {isLoading ? (
        <span className={styles.loading}><CircularProgress color="primary" /></span>
      ) : (
        <InitialPanelThumbnail svg={schedule} description={description} />
      )}
    </>
  );
};

export default SchedulePanelThumbnail;
