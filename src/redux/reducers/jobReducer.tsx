export const jobReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_JOBS': {
      return action.payload;
    }

    case 'GET_JOBS_DETAILS': {
      return action.payload;
    }

    default:
      return state;
  }
};


export const requestReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_REQUESTS': {
      return action.payload;
    }

    case 'GET_REQUESTS_DETAILS': {
      return action.payload;
    }

    default:
      return state;
  }
};
