import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(() => ({
  contentWrapper: {
    minHeight: 'calc(100vh - 64px - 8em - 16px)',
  },
}));

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
