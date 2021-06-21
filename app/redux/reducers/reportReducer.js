import types from "../types/reportTypes";

const INITIAL_STATE = {
  name: "Reports",

  userId: 0,
  reportList: [],

};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REPORT_ADD:
      return {
        ...state, reportList: [...state.reportList, action.item],
      };

    case types.REPORT_END:
      // TODO: end report
      return {
        ...state, reportList: [...state.reportList.filter(item => item.id !== action.item)],
      };

    case types.REPORT_DELETE:
      // TODO:delete report
      return {
        ...state, reportList: [...state.reportList.filter(item => item.id !== action.item)],
      };

    case types.REPORT_RESET:
      return {
        ...state, reportList: [],
      };

    default:
      return state;
  }
};

export default reportReducer;
