import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  controls: {
    marginTop: theme.spacing(3),
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.header} component="h1" variant="h5">
        <PersonIcon/>
        Восстановление пароля
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MailIcon/>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Введите ваш email на который придёт ссылка"
              autoFocus
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
            >
              Восстановить
          </Button>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link to="/signup">
            <Button
                fullWidth
                variant="outlined"
                color="primary"
              >
                Регистрация
            </Button>
          </Link>
        </Grid>
        <Grid item sm={4} xs={6}>
          <Link to="/login">
            <Button
                fullWidth
                variant="outlined"
                color="primary"
              >
                Войти
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  )
}