import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
  username: localStorage.getItem('username') || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.username = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.username = payload.username
      },
    )
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
