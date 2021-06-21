import userActions from "../actions/userActions";

const getToken = async (email, password) => {
  const response = await fetch("", { method: "GET" });
  const json = await response.json();

  return json;
};

const Authorize = (email, password) =>
  async (dispatch) => {
    const token = await getToken(email, password);
    console.log();
    dispatch(userActions.login(token));
  };


export default {
  Authorize,
};
