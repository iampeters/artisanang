let isAuthenticated: any = sessionStorage.getItem('auth');
if (!isAuthenticated) {
  isAuthenticated = false;
}
export const authReducer = (state = isAuthenticated, action: any) => {
  switch (action.type) {
    case 'IS_LOGGED_IN': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const tokenReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'AUTH_TOKEN': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const userReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'USER': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const chatUserReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'CHAT_USER': {
      return action.payload;
    }
    default:
      return state;
  }
};


export const loginReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'AUTHENTICATE': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const dashboardReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'DASHBOARD': {
      return action.payload;
    }

    default:
      return state;
  }
};
