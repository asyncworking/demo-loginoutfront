import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  add: {
    width: '130px',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
  header: {
    textAlign: 'center',
    padding: 0,
    marginBottom: '40px',
    h1: {
      margin: 'auto',
    },
  },
  header__line: {
    textAlign: 'center',
    padding: 0,
    marginBottom: '40px',
    width: '100%',
    height: '2px',
    backgroundColor: '#293c46',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8px',
  },

  head_name: {
    width: 'fit-content',
    margin: 'auto',
  },
  head_title: {
    position: 'relative',
    paddingBottom: '10px',
  },

  head_btnArea: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

export default useStyles;
