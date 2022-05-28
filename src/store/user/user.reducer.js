import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, //Always right your cases like thiss where you spread the previous values and update only what is needed.
        currentUser: payload,
      };
    default:
      return state; //must return state when using reducers/redux. A reducer can take any action so if it is not in the cases, we must return state.
    // Note: DONT PUT BRACKETS AROUND THIS - makes for some really weird behavior
  }
};
