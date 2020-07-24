export const artisanReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'CREATE_ARTISAN': {
      return action.payload;
    }

    case 'GET_ARTISANS': {
      return action.payload;
    }

    case 'GET_ARTISAN': {
      return action.payload;
    }

    default:
      return state;
  }
};