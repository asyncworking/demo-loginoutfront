import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  content: {
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkbox: {
    marginLeft: '80px',
  },
  row: {
    border: 'none',
    padding: '0',
  },
}));
