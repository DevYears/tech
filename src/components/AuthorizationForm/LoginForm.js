import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { fetchGrantPassword } from '../../actions/AutorizationActions';
import { useAuthFormStyles } from '../../commonStyles';
import { navigateToHandler, PAGES } from '../../routes/routes';

export default function () {
  const classes = useAuthFormStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.authErrorMessage) || '';

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(fetchGrantPassword(login, password));
  };

  return (
    <>
      <Typography className={classes.header} component="h1" variant="h5">
        <PersonIcon />
        Вход в систему
      </Typography>
      <ValidatorForm
        className={classes.form}
        onSubmit={handleLogin}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextValidator
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Введите ваш email"
              autoFocus
              onChange={handleLoginChange}
              value={login}
              validators={['required', 'isEmail']}
              errorMessages={['укажите корректный email', 'укажите корректный email']}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Введите ваш пароль"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
              validators={['required', 'minStringLength:8']}
              errorMessages={['укажите пароль', 'укажите пароль']}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {error !== ''
              ? (
                <Alert severity="error">
                  <AlertTitle>Ошибка</AlertTitle>
                  {error}
                </Alert>
              ) : null}
          </Grid>
        </Grid>
        <Grid className={classes.controls} container spacing={1}>
          <Grid item sm={4} xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Войти
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
          <Grid item sm={4} xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={navigateToHandler(history, PAGES.forgot)}
            >
              Забыли пароль?
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
