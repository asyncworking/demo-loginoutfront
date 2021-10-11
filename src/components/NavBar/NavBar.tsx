/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@material-ui/core';
import DropdownMenu from './components/DropdownMenu/DropdownMenu';
import Item from './components/Item/Item';
import './NavBar.scss';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClass = ['navbar'];
  if (scrolled) {
    navbarClass.push('scrolled');
  }
  return (
    <Grid>
      <nav className={navbarClass.join(' ')}>
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          xs={8}
        >
          <Grid
            item
            container
            xs={2}
            spacing={3}
            direction="row"
            wrap="nowrap"
          >
            <Item to="/dashboard/" itemName="Home" />
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <DropdownMenu />
        </Grid>
      </nav>
    </Grid>
  );
};

export default NavBar;
