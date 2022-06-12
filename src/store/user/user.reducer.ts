import { AnyAction } from 'redux';

import {
  signOutFailed,
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
} from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }

  return state; //must return state when using reducers/redux. A reducer can take any action so if it is not in the cases, we must return state.
  // Note: DONT PUT BRACKETS AROUND THIS - makes for some really weird behavior - This whole this changes when adapting to RTK(redux-toolkit)
};
