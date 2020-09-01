import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from '../actions/AutorizationActions';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  logoutButton: {
    color: '#fff',
  },
}));

export default function ({ auth }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          ЛИДОВ.РФ: ЛК технолога
        </Typography>
        {auth
          ? (
            <IconButton
              onClick={handleLogout}
              className={classes.logoutButton}
            >
              <ExitToAppIcon />
            </IconButton>
          )
          : null}
      </Toolbar>
    </AppBar>
  );
}
