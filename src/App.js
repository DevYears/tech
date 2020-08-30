import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import AuthorizationForm from './components/AuthorizationForm/AuthorizationForm'

function App() {
  return (
    <Router>
      <AuthorizationForm/>
    </Router>
  );
}

export default App;
