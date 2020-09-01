import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line import/prefer-default-export
export const useAuthFormStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  controls: {
    marginTop: theme.spacing(3),
  },
}));
