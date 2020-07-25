export const reviewReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'CREATE_REVIEW': {
      return action.payload;
    }

    case 'GET_REVIEWS': {
      return action.payload;
    }

    case 'GET_REVIEW': {
      return action.payload;
    }

    case 'UPDATE_REVIEW': {
      return action.payload;
    }

    case 'DELETE_REVIEW': {
      return action.payload;
    }

    default:
      return state;
  }
};