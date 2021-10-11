import React from 'react';
import { Divider } from '@material-ui/core';
import footerStyles from './FooterStyle';
import footerStylesPublic from './FooterStylePublic';

interface FooterProps {
  isLoginPage: Boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoginPage: isPublic }:FooterProps) => {
  const classes = isPublic ? footerStylesPublic() : footerStyles();

  return (
    <footer className={classes.root}>
      <Divider variant="middle" className={classes.line} />
      <div className={classes.text}>Copyright &copy; 2021 ASYNC-WORKING PTY LTD. &nbsp;ABN:&nbsp;70649121568</div>
    </footer>

  );
};

export default Footer;
