import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  internships: [],
};

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    setInternships: (state, action) => {
      state.internships = action.payload;
    },
  },
});
const { reducer, actions } = internshipSlice;
export const { setInternships } = actions;
export default reducer;
