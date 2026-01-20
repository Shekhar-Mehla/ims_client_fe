import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  application: null,
  loading: false,
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.application = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
  },
});
const { reducer, actions } = applicationSlice;
export const { setApplications, setLoading } = actions;
export default reducer;
