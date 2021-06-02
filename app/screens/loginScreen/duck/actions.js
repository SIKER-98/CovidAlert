import types from "./types";

const login = item => ({
  type: types.USER_LOGIN, item,
});

const logout = () => ({
  types: types.USER_LOGOUT,
});

const userInfo = () => ({
  types: types.USER_INFO,
});

export default {
  login,
  logout,
  userInfo,
};
