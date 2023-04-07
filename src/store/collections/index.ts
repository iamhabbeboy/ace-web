import { combineReducers } from "redux";

import userReducer from "./user";
import examReducer from "./exam";

const rootReducer = combineReducers({
  account: combineReducers({
    user: userReducer,
    exam: examReducer,
  })
});

export default rootReducer;
