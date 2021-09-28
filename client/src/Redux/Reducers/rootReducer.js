import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { templateReducer } from "./templateReducer";
import { myCardsReducer } from "./myCardsReducer";

export const rootReducer = combineReducers({ templates: templateReducer, user: userReducer, myCards: myCardsReducer })