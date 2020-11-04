export const chatReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_CHATS': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const activeChatReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'GET_ACTIVE_CHATS': {
      return action.payload;
    }

    default:
      return state;
  }
};