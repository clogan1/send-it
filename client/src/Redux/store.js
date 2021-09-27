import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../Redux/Reducers/rootReducer"
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeMiddleware = applyMiddleware(thunk)
export const store = createStore(rootReducer, composeEnhancers(composeMiddleware));