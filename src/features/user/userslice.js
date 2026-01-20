import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setUser, setLoading } = actions;
export default reducer;
