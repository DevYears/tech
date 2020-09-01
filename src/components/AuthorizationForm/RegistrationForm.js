import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';

import { useAuthFormStyles } from '../../commonStyles';
import { navigateToHandler, PAGES } from '../../routes/routes';

export default function () {
  const classes = useAuthFormStyles();
  const history = useHistory();

  return (
    <>
      <Typography className={classes.header} component="h1" variant="h5">
        <PersonIcon />
        Регистрация
      </Typography>
      <Typography component="p">
        Раздел в разработке...
      </Typography>
      <Grid className={classes.controls} container spacing={1}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled
          >
            Зарегистрироваться
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={navigateToHandler(history, PAGES.login)}
          >
            Войти
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
