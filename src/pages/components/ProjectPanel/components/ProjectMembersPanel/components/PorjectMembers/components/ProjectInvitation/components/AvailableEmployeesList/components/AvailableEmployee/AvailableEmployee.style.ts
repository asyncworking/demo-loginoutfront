import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  card: {
    width: '300px',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '15px',
  },
  name: {
    fontWeight: 'bold',
    fonSize: '15px',
  },
}));
