import AuthService from '../../Services/AuthService';

export const userAction = (state: any) => {
  return (dispatch: any) => {
    dispatch({ type: 'TYPING', payload: state });
  };
};

export const isAuthenticated = (state: any = {}) => {
  return (dispatch: any) => {
    dispatch({ type: 'IS_AUTHENTICATED', payload: state });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'IS_AUTHENTICATED',
      payload: { isAuthenticated: false },
    });
  };
};
