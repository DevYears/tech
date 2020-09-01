import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';

import { useAuthFormStyles } from '../../commonStyles';
import { navigateToHandler, PAGES } from '../../routes/routes';

export default function () {
  const classes = useAuthFormStyles();
  const history = useHistory();

  return (
    <>
      <Typography className={classes.header} component="h1" variant="h5">
        <PersonIcon />
        Восстановление пароля
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Введите ваш email на который придёт ссылка"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </form>
      <Grid className={classes.controls} container spacing={1}>
        <Grid item sm={4} xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled
          >
            Восстановить
          </Button>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={navigateToHandler(history, PAGES.signup)}
          >
            Регистрация
          </Button>
        </Grid>
        <Grid item sm={4} xs={6}>
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
