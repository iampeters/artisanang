import React from 'react';
import './App.scss';
import OpenLayout from './layouts/OpenLayout';
import SecuredLayout from './layouts/SecuredLayout';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  let auth = useSelector((state: any) => state.auth);
  if (auth === null) {
    auth = false;
  }

  return (
    <Router>
      <SnackbarProvider maxSnack={2} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {auth ? <SecuredLayout /> : <OpenLayout />}
      </SnackbarProvider>
    </Router>
  );
}

export default App;
