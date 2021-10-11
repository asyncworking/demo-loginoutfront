import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  selectBtn: {
    color: 'rgb(0, 100, 255)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  addBtn: {
    width: '200px',
    color: 'white',
    fontSize: '15px',
    paddingLeft: '0',
    paddingRight: '0',
    borderRadius: '30px',
    textTransform: 'initial',
    marginRight: '10px',
  },
  cancelBtn: {
    width: '150px',
    color: '#2ab782',
    fontSize: '15px',
    borderRadius: '30px',
    border: 'solid 1px #2ab782',
    textTransform: 'initial',
  },
}));
