import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import {
  Link,
} from 'react-router-dom';
import './Item.scss';

interface NavbarItemProps {
  to: string
  itemName: string
}

const Item = ({ to, itemName }: NavbarItemProps) => {
  const linkStyle = 'navbar__menuitem';
  return (
    <Link to={to} className={linkStyle}>
      <HomeIcon />
      {itemName}
    </Link>
  );
};

export default Item;
