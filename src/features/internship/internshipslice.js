import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  internships: [],
  internship: {},
};

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    setInternships: (state, action) => {
      state.internships = action.payload;
    },
    // setInternship: (state, action) => {
    //   state.internship = action.payload;
    // },
    setInternshipBySlug: (state, action) => {
      state.internship = action.payload;
    },
    clearInternships: (state) => {
      state.internships = [];
    },
  },
});
const { reducer, actions } = internshipSlice;
export const { setInternships, setInternshipBySlug, clearInternships } =
  actions;
export default reducer;
