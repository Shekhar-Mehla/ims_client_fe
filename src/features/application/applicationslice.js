import { createSlice } from "@reduxjs/toolkit";

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
    
  },
});
const { reducer, actions } = applicationSlice;
export const { setApplications } = actions;
export default reducer;
