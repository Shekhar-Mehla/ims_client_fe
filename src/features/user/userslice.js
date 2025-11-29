import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
