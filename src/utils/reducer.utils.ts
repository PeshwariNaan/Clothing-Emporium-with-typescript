import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};


//Changing the create action function to include types: We use 'overloaded' functions to account for both actions w/ payload and
//without payload
export  function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}


