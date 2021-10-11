import React from 'react';
import styles from '../Breadcrumb.module.scss';

interface PropsType {
  url: string,
  name: string,
}

const BreadcrumbLink = (props: PropsType) => {
  const { url, name } = props;
  return (
    <a
      type="button"
      key={url}
      className={styles.navName}
      href={url}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {name}
    </a>
  );
};

export default BreadcrumbLink;
