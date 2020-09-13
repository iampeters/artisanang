export const fileReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'FILE_UPLOAD': {
      return action.payload;
    }
    default:
      return state;
  }
};