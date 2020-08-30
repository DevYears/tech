import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Switch, Route } from 'react-router-dom'

import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import ForgotForm from './ForgotForm'

const useStyles = makeStyles((theme) => ({}));

const formList = {
  login: {name: 'Вход в систему', component: <LoginForm/>},
  registration: {name: 'Регистрация', component: <RegistrationForm/>}
}

export default function () {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <CardContent>
          <Switch>
            <Route exact path="/">
              <LoginForm/>
            </Route>
            <Route exact path="/login">
              <LoginForm/>
            </Route>
            <Route exact path="/signup">
              <RegistrationForm/>
            </Route>
            <Route exact path="/forgot">
              <ForgotForm/>
            </Route>
          </Switch>
        </CardContent>
      </Card>
    </Container>
  )
}