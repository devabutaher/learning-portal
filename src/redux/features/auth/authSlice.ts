import { createSlice } from "@reduxjs/toolkit";

const localUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: localUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    userLoggedOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
