export const loaderReducer = (state = { isLoading: false }, action: any) => {
  switch (action.type) {
    case 'LOADER': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const menuReducer = (state = 'inline-block' , action: any) => {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return action.payload;
    }

    default:
      return state;
  }
};
