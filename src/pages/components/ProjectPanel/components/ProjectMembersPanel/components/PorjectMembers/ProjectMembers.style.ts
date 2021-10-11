import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  root: {
    width: '120px',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
  peopleList: {
    padding: '5px',
  },
  bottomContent: {
    padding: '30px 50px',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));
