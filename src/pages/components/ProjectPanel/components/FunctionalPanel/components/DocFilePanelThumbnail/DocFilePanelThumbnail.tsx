import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import file from 'src/assets/svgs/file.svg';
import InitialPanelThumbnail from '../InitialPanelThumbnail/InitialPanelThumbnail';
import styles from './DocFilePanelThumbnail.module.scss';

const DocFilePanelThumbnail = (props: any) => {
  const { isLoading } = props;
  const description = 'Share docs, files, images, and spreadsheets. Organize in folders so they’re easy to find.';

  return (
    <>
      {isLoading ? (
        <span className={styles.loading}><CircularProgress color="primary" /></span>
      ) : (
        <InitialPanelThumbnail svg={file} description={description} />
      )}
    </>
  );
};

export default DocFilePanelThumbnail;
