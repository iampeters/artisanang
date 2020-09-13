
export const categoryReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'GET_CATEGORY': {
      return action.payload;
    }

    default:
      return state;
  }
};
