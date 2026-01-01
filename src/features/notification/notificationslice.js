import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notifications = action.payload;
    },
    // setInternship: (state, action) => {
    //   state.internship = action.payload;
    // },
  },
});
const { reducer, actions } = notificationSlice;
export const { setNotification } = actions;
export default reducer;
