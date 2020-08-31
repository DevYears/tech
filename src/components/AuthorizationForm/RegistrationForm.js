import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import PersonIcon from '@material-ui/icons/Person';

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