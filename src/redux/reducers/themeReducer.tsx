export const themeReducer = (state = 'light', action: any) => {
  switch (action.type) {
    case 'GET_THEME': {
      return action.payload;
    }

    case 'SET_THEME': {
      return action.payload;
    }

    case 'GET_APP_THEME': {
      return action.payload;
    }

    default:
      return state;
  }
};
