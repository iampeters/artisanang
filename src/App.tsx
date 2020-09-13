import React from 'react';
import './App.scss';
import OpenLayout from './layouts/OpenLayout';
import SecuredLayout from './layouts/SecuredLayout';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ArtisanLayout from './layouts/ArtisanLayout';

function App() {
  let auth = useSelector((state: any) => state.auth);
  let user = useSelector((state: any) => state.user);
  if (auth === null) {
    auth = false;
  }
  let userType = 1;

  if (user && user.userType) {
    userType = user.userType;
  }

  return (
    <Router>
      <SnackbarProvider maxSnack={2} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {auth ? (userType === 1 ? <SecuredLayout /> : <ArtisanLayout />) : <OpenLayout />}
      </SnackbarProvider>
    </Router>
  );
}

export default App;
