import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Tasks from '../components/Tasks/Tasks';
import TaskShow from '../components/Tasks/TaskShow';
import { PAGES } from './routes';

export default function () {
  return (
    <Switch>
      <Route exact path={PAGES.tasks}>
        <Tasks />
      </Route>
      <Route path="/tasks/:id">
        <TaskShow />
      </Route>
      <Route>
        <Tasks />
      </Route>
    </Switch>
  );
}
