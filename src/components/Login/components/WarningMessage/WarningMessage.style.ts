import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  warning: {
    margin: '20px 0',
    padding: '3%',
    borderRadius: '10px',
    border: 'solid 2px #eb5757',
    backgroundColor: '#fcebea',
    display: 'flex',
    alignItems: 'center',
  },
  warning_message: {
    fontWeight: 500,
    marginLeft: '16px',
    textAlign: 'left',
    color: '#eb5757',
  },
}));
