import types from "../types/locationTypes";

const INITIAL_STATE = {
  name: "Locations",

  userCoords: {
    latitude: 0,
    longitude: 0,
  },

  reportCoords: customMarkers,
  // reportCoords: [],
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOCATION_REFRESH:
      return {
        ...state, reportCoords: customMarkers,
      };

    case types.LOCATION_RESET:
      return {
        ...state, reportCoords: [],
      };

    case types.LOCATION_SET_USER:
      return {
        ...state, userCoords: action.item,
      };

    default:
      return state;
  }
};

export default locationReducer;

const customMarkers = [
  {
    latitude: 51.427,
    longitude: 21.150,
    message: "mesg1",
    number: 666,
    username: "test1",
  },
  {
    latitude: 51.428,
    longitude: 21.150,
    message: "mesg2",
    number: 667,
    username: "test2",
  },
  {
    latitude: 51.426,
    longitude: 21.150,
    message: "mesg3",
    number: 666,
    username: "test3",
  },
  {
    latitude: 51.427,
    longitude: 21.151,
    message: "mesg4",
    number: 666,
    username: "test4",
  },
  {
    latitude: 51.427,
    longitude: 21.149,
    message: "mesg5",
    number: 666,
    username: "test5",
  },
];
