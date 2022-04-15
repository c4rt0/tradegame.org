import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./Reducers/Auth/authReducer";
import { AlertReducer } from "./Reducers/Alert/alerReducer";
import { StockReducer } from "./Reducers/Stock/StockReducer";

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("dispatching action", action);
  console.log("before dispatching state", store.getState());
  let result = next(action);
  setTimeout(() => {
    console.log("dispatch time out");
  }, 3000);
  console.log("next state", store.getState());
  return result;
};

const middleware = applyMiddleware(thunk, loggerMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
  stock: StockReducer
});

export const store = createStore(reducers, composeEnhancers(middleware));
