import { makeStyles, createStyles } from '@material-ui/core';

const footerStyles = makeStyles(() => createStyles({
  root: {
    position: 'relative',
    bottom: 0,
  },
  text: {
    color: '#86868b',
    fontSize: '12px',
    textAlign: 'center',
    margin: '10px',
  },
  line: {
    marginTop: '80px',
  },
}));

export default footerStyles;
