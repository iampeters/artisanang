export const loaderReducer = (state = false, action: any) => {
  switch (action.type) {
    case 'LOADING': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const menuReducer = (state = 'd-md-inline-block' , action: any) => {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const navBarReducer = (state = false , action: any) => {
  switch (action.type) {
    case 'TOGGLE_NAVBAR': {
      return action.payload;
    }

    default:
      return state;
  }
};


export const changePasswordReducer = (state = false , action: any) => {
  switch (action.type) {
    case 'TOGGLE_PASSWORD_DRAWER': {
      return action.payload;
    }

    default:
      return state;
  }
};


export const profileEditReducer = (state = false , action: any) => {
  switch (action.type) {
    case 'TOGGLE_PROFILE_DRAWER': {
      return action.payload;
    }

    default:
      return state;
  }
};

