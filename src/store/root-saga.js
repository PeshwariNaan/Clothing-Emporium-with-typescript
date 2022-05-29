import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";
import { userSaga } from './user/user.saga'

// The signature 'function*' seen below is a generator function
//This is a function that resembles async await - it yields an object in the form of {value: x, done: true/false}. It
// gives us control of when we want to continue execution of a block of code:
// example>
//function* gen(i) {
//yield i;
//yield i + 10;
//} this will pause at each line and out put the execution of this line of code in the object from above
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)])
}
