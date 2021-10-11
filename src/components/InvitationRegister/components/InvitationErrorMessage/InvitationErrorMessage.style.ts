import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  error__invitation: {
    visibility: 'hidden',
  },
  error__invitation__active: {
    visibility: 'visible',
    backgroundColor: '#fffae5',
    textJustify: 'auto',
    border: '1px solid #ffeb99',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
}));
