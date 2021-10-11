import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  icon: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '3px',
  },
  square: {
    width: '16px',
    height: '16px',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  linkName: {
    marginLeft: '8px',
    textDecoration: 'underline',
    color: 'dodgerblue',
    fontWeight: 700,
  },
  name: {
    fontSize: 'xx-large',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    boxSizing: 'border-box',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '0 50px',
    textAlign: 'center',
  },
}));
