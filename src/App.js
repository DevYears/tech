import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import { useAppStyles } from './commonStyles';
import Tasks from './components/Tasks/Tasks';
import FormContainer from './components/AuthorizationForm/FormContainer';
import Header from './components/Header';
import Notification from './components/Notification';
import Footer from './components/Footer';
import store from './store';

function DecideComponent(auth) {
  if (auth) {
    return <Tasks />;
  }
  return <FormContainer />;
}

function App({ auth }) {
  const classes = useAppStyles();
  return (
    <>
      <Header auth={auth} />
      <Notification />
      <div className={classes.contentWrapper}>
        {DecideComponent(auth)}
      </div>
      <Footer />
    </>
  );
}

const AppWithStore = connect(
  ({ auth }) => ({
    auth: auth.auth,
  }),
)(App);

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <AppWithStore />
      </Router>
    </Provider>
  );
}

export default Root;
