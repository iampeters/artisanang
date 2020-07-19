export const authReducer = (state = true, action: any) => {
  switch (action.type) {
    case 'IS_LOGGED_IN': {
      return action.payload;
    }

    default:
      return state;
  }
};
