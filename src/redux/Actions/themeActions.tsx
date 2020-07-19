export const setTheme = (state: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'SET_THEME', payload: state });
  };
};

export const getTheme = (state: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'GET_THEME', payload: state });
  };
};

export const getAppTheme = (state: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'GET_APP_THEME', payload: state });
  };
};

export const menuToggle = (state: string) => {
  return (dispatch: any) => {
    dispatch({ type: 'TOGGLE_MENU', payload: state });
  };
};
