import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {...state, currentUser: null}
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return { ...state, error: payload };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return { ...state, error: payload };
    default:
      return state; //must return state when using reducers/redux. A reducer can take any action so if it is not in the cases, we must return state.
    // Note: DONT PUT BRACKETS AROUND THIS - makes for some really weird behavior
  }
};
