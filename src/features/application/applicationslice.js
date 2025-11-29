import { createSlice } from "@reduxjs/toolkit";
import { getApplicationsByUser } from "./applicationapi";
const initialState = {
  application: [],
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.application = action.payload;
    },
    // getApplication: (state, action) => {
    //   state.application = action.payload;
    // },
  },
});
const { reducer, actions } = applicationSlice;
export const { setApplications, getApplication } = actions;
export default reducer;
