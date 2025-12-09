import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setUser, setLoading } = actions;
export default reducer;
