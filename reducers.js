import { combineReducers } from "redux";
import userReducer from "./app/screens/loginScreen/duck";

const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer();
