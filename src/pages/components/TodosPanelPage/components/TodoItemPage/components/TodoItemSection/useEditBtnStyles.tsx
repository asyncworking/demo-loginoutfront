import { createStyles, makeStyles } from '@material-ui/core';

const useEditBtnStyles = (aWidth:string, cWidth:string) => makeStyles(() => createStyles({
  add: {
    width: aWidth,
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'none',
  },
  cancel: {
    width: cWidth,
    fontSize: '0.8rem',
    borderColor: '#47b076',
    color: '#47b076',
    borderRadius: '30px',
    textTransform: 'none',
  },
}))();

export default useEditBtnStyles;
