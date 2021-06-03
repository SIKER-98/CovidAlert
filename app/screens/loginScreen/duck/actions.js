import types from "./types";

const login = item => ({
  type: types.USER_LOGIN, item,
});

const logout = () => ({
  type: types.USER_LOGOUT,
});

const userInfo = () => ({
  type: types.USER_INFO,
});

export default {
  login,
  logout,
  userInfo,
};
