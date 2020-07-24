export const alertReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'ALERT': {
      return action.payload;
    }

    default:
      return state;
  }
};