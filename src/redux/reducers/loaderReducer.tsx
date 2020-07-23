export const loaderReducer = (state = false, action: any) => {
  switch (action.type) {
    case 'LOADING': {
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
