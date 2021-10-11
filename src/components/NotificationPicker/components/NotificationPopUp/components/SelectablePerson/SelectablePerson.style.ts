import { createStyles, makeStyles } from '@material-ui/core/styles';
import makeAsDone from 'src/assets/svgs/markAsDone.svg';

export default makeStyles(() => createStyles({
  selectable_person: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    borderTop: '1px solid #e5e5e5',
    '&:first-of-type': {
      border: '0',
    },
  },
  member_info: {
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  member_title: {
    fontWeight: 'initial',
    display: 'inline',
  },
  checkbox_button: {
    cursor: 'pointer',
    display: 'inline-block',
    width: '20px',
    height: '20px',
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '20px',
      height: '20px',
      top: '-1px',
      left: '-1px',
      border: '1px solid rgba(0,0,0,0.25)',
      borderRadius: '5px',
      backgroundColor: 'white',
    },
    '&:checked:after': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: '-1px',
      left: '-1px',
      backgroundImage: `url(${makeAsDone})`,
      background: 'no-repeat center center',
      backgroundSize: '65%',
      border: '1px solid rgba(0,0,0,0.25)',
      backgroundColor: '#2da562',
      borderRadius: '5px',
    },
  },
}));
