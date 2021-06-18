import types from "../types/reportTypes";

const addReport = item => ({
  type: types.REPORT_ADD, item,
});

const endReport = item => ({
  type: types.REPORT_END, item,
});

const deleteReport = item => ({
  type: types.REPORT_DELETE, item,
});

const resetReport = () => ({
  type: types.REPORT_RESET,
});

export default {
  addReport,
  endReport,
  deleteReport,
  resetReport,
};
