import types from "../types/locationTypes";

const INITIAL_STATE = {
  name: "Locations",

  userCoords: {
    latitude: 0,
    longitude: 0,
  },

  reportCoords: [],
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOCATION_REFRESH:
      return {
        ...state, reportCoords: [],
      };

    case types.LOCATION_RESET:
      return {
        ...state, reportCoords: [],
      };

    case types.LOCATION_SET_USER:
      return {
        ...state, userCoords: action.item,
      };


    case types.LOCATION_ADD:
      return {
        ...state, reportCoords: [...state.reportCoords, action.item],
      };

    default:
      return state;
  }
};

export default locationReducer;
