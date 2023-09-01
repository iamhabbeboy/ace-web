import { combineReducers } from "redux";

import userReducer from "./user";
import examReducer from "./exam";
import answerReducer from "./answer";
import questionReducer from "./question";

const rootReducer = combineReducers({
  account: combineReducers({
    user: userReducer,
    exam: examReducer,
    answer: answerReducer,
    question: questionReducer,
  })
});

export default rootReducer;
