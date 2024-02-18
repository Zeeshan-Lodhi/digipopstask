import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
