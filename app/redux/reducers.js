import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import reportReducer from "./reducers/reportReducer";
import locationReducer from "./reducers/loactionReducer";

const rootReducer = combineReducers({
  users: userReducer,
  reports: reportReducer,
  locations: locationReducer,
});

export default rootReducer;
