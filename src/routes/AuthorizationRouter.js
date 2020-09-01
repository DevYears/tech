import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginForm from '../components/AuthorizationForm/LoginForm';
import RegistrationForm from '../components/AuthorizationForm/RegistrationForm';
import ForgotForm from '../components/AuthorizationForm/ForgotForm';
import { PAGES } from './routes';

export default function () {
  return (
    <Switch>
      <Route exact path={PAGES.login}>
        <LoginForm />
      </Route>
      <Route exact path={PAGES.signup}>
        <RegistrationForm />
      </Route>
      <Route exact path={PAGES.forgot}>
        <ForgotForm />
      </Route>
      <Route>
        <LoginForm />
      </Route>
    </Switch>
  );
}
