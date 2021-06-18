import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import reportReducer from "./reducers/reportReducer";

const rootReducer = combineReducers({
  users: userReducer,
  reports: reportReducer,
});

export default rootReducer;
