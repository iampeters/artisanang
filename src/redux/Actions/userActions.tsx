import AuthService from '../../Services/AuthService';

export const userAction = (state: any) => {
  return (dispatch: any) => {
    dispatch({ type: 'TYPING', payload: state });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: { isAuthenticated: false },
    });
  }
};

export const login = (state: any) => {
  const authService = new AuthService();

  const api = authService.login(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');
          
          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'AUTHENTICATE',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
            },
          });
        } else {
          dispatch({
            type: 'AUTHENTICATE',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'AUTHENTICATE',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      });
  };
};

export const socialAuth = (state: any) => {
  const api = new AuthService().socialAuth(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');
          
          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'AUTHENTICATE',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
            },
          });
        } else {
          dispatch({
            type: 'AUTHENTICATE',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'AUTHENTICATE',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};


export const signUp = (state: any) => {
  const authService = new AuthService();

  const api = authService.signUp(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');
          
          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'AUTHENTICATE',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
            },
          });
        } else {
          dispatch({
            type: 'AUTHENTICATE',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'AUTHENTICATE',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};
