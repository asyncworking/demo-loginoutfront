/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory } from 'react-router-dom';
import styles from './SideBar.module.scss';

export interface SideBarData {
  key: number;
  path: string;
  title: string;
  icon: JSX.Element
}

interface SideBarProps {
  SideBarData:SideBarData[]
}

const SideBar:React.FC<SideBarProps> = ({ SideBarData }: SideBarProps) => {
  const [activation, setActivation] = useState(false);

  const history = useHistory();

  const jump = (path: string) => {
    history.push(path);
  };

  const activateMenu = () => {
    setActivation(!activation);
  };

  return (
    <div className={styles.sideBar}>
      <MoreHorizIcon
        className={activation ? styles.more_hide : styles.more}
        onClick={activateMenu}
      />
      <ClearIcon
        className={activation ? styles.clear : styles.clear_hide}
        onClick={activateMenu}
      />
      <ul className={activation ? styles.menuItems : styles.menuItems_hidden}>
        {SideBarData.map((item:SideBarData) => (
          <li
            key={item.key}
            className={styles.menuItem}
            onClick={() => {
              jump(item.path);
            }}
            onKeyDown={() => {}}
          >
            {item.icon}
            <span className={styles.menuItem_title}>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default SideBar;
