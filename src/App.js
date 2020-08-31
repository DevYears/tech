import React, {Fragment} from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import './App.css';
import Tasks from './components/Tasks/Tasks'
import AuthorizationForm from './components/AuthorizationForm/AuthorizationForm'
import Header from './components/Header'
import Footer from './components/Footer'
import store from './store'

function DecideComponent(auth) {
  if (auth) {
    return <Tasks/>
  } else {
    return <AuthorizationForm/>
  }
}

function App({auth}) {
  return (
    <Fragment>
      <Header auth={auth}/>
      {DecideComponent(auth)}
      <Footer/>
    </Fragment>
  )
}

const AppWithStore = connect(
  ({auth}) => ({
    auth: auth.auth
  })
)(App)

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <AppWithStore/>
      </Router>
    </Provider>
  );
}

export default Root;
