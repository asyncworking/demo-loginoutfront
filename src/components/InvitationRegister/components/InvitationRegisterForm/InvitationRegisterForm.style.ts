import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  button: {
    marginTop: theme.spacing(2),
  },
  invitationRegisterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    minWidth: '300px',
  },
}));
