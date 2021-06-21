import types from "../types/userTypes";

const INITIAL_STATE = {
  name: "userStatus",
  userId: -1,
  email: "",
  token: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return { ...state, email: action.item.email, token: action.item.token, userId: action.item.userId };
    case types.USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
