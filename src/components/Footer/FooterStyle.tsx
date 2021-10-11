import { makeStyles, createStyles } from '@material-ui/core';

const footerStyles = makeStyles(() => createStyles({
  root: {
    marginTop: 'auto',
  },
  text: {
    color: '#86868b',
    fontSize: '12px',
    textAlign: 'center',
    margin: '10px',
  },
  line: {
    marginTop: '30px',
  },
}));

export default footerStyles;
