import types from "../types/locationTypes";

const locationReset = () => ({
  type: types.LOCATION_RESET,
});

const locationRefresh = () => ({
  type: types.LOCATION_REFRESH,
});

const locationSetUser = item => ({
  type: types.LOCATION_SET_USER, item
});

const locationAdd = item =>({
  type:types.LOCATION_ADD, item
})

export default {
  locationRefresh,
  locationReset,
  locationSetUser,
  locationAdd
};
