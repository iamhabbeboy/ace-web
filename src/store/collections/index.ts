import { combineReducers } from "redux";

import userReducer from "./user";
import examReducer from "./exam";
import questionReducer from "./question";

const rootReducer = combineReducers({
  account: combineReducers({
    user: userReducer,
    exam: examReducer,
    question: questionReducer,
  })
});

export default rootReducer;
