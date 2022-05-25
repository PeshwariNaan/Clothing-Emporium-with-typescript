import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
currentUser: null
}

export const userReducer = (state, action) => {
console.log('dispatched')
console.log(action)
const { type, payload } = action;
switch (type) {
  case USER_ACTION_TYPES.SET_CURRENT_USER:
    return {
      ...state,  //Always right your cases like thiss where you spread the previous values and update only what is needed.
      currentUser: payload,
    };
    default:
      throw new Error(`unhandled type ${type} in userReducer`)
}
};



// this is the provider which is the actual component - this is a wrapper that will wrap the components that we want to access
export const UserProvider = ({ children }) => {
  const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE)
  console.log(currentUser)

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)) // Dispatch the type and payload
  }
  
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe; //THis is a clean-up function that removes the listener - still a bit confusing. It must remove previously
    //created listeners, they will continue to stack creating a data leak and we dont want that do we...
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// IMPORTANT - remember that any component that is hooked into the context will run. Even if the jsx is not changed (component doesn't rerender),
// all the code up until the return will run again which can cause performance issues if we have tons of components
// that are hooked into the useContext hook - be careful. This is why we centralize the code through the auth listener.
