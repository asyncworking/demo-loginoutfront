import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => createStyles({
  options__action: {
    border: 0,
    background: 'none',
    textAlign: 'left',
    width: '100%',
    display: 'block',
    lineHeight: 1.2,
    padding: '0.7rem 1.2rem 0.7rem 2.8rem',
    backgroundPosition: '1rem 50%',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E9F7FA',
    },
  },
}));
