import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
//import { loggerMiddleware } from "./middleware/logger";
import logger from "redux-logger";
import thunk from "redux-thunk";

// Now using the built-in logger but refer to logger.js to see how it works :)
const middleWares = [process.env.NODE_ENV === "development" && logger, thunk].filter(
  Boolean
);

const composedEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
