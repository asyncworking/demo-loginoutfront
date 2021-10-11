import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  add: {
    width: '170px',
    fontSize: '0.8rem',
    borderRadius: '30px',
    color: '#47b076',
    backgroundColor: '#fff',
    borderColor: '#47b076',
    textTransform: 'capitalize',
    padding: '8px 16px 8px 16px',
  },
  richEditor: {
    marginTop: '2rem',
  },
  message_add: {
    display: 'flex',
    flexDirection: 'column',
    padding: '7.5px 10px 5px 10px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 6,
  },
  err: {
    width: 'fit-content',
    color: 'red',
  },
  add_name: {
    width: '100%',
    fontSize: 35,
    fontWeight: 700,
    outline: 0,
    border: 0,
  },
  add_details: {
    boxSizing: 'border-box',
    padding: '6px 0 6px 0',
    borderTop: '1px solid #f2f2f2',
  },
  add_detailsBtn: {
    float: 'left',
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 400,
    color: '#a9a9a9',
    width: '100%',
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  add_btn: {
    paddingTop: 20,
  },
  post_btnArea: {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px 0px 20px 0',
  },
  message__select: {
    marginBottom: '1.25rem',
  },
  notification_picker: {
    paddingTop: '1.5rem',
  },
  message__footer: {
  },
}));

export default useStyles;
