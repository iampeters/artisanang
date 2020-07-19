import React from 'react';
import './App.scss';
import OpenLayout from './layouts/OpenLayout';
import SecuredLayout from './layouts/SecuredLayout';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const auth = useSelector((state: any) => state.auth);

  return (
    <Router>
      {auth ? <SecuredLayout /> : <OpenLayout />}
    </Router>
  );
}

export default App;
