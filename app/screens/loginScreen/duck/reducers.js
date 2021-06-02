import types from "./types";

const INITIAL_STATE = {
  name: "userStatus",
  userId: -1,
  username: "",
  email: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_INFO:
      return { ...state };
    case types.USER_LOGIN:
      return { ...state, ...action.item };
    case types.USER_LOGOUT:
      return { ...state, userId: -1, username: "", email: "" };
    default:
      return state;
  }
};

export default userReducer;
