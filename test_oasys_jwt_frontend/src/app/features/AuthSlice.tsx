import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { IRegCredentials } from '../models/IAuth';
import AuthService from '../services/AuthService';

interface IInitialState {
  payload: IUser[];
  loading?: any;
  error?: any;
}

const initialState: IInitialState = {
  payload: [
    {
      nickname: '',
      password: '',
      type: 1,
      lvl: 1,
      balance: 0,
    },
  ],
};

export const registration = createAsyncThunk(
  'auth/registration',
  async (credentials: IRegCredentials) => {
    credentials.nickname = credentials.nickname.toLowerCase(); // we dont want BIG CHARS
    const responce = await AuthService.registration(credentials);
    console.log(responce.data);
    return responce.data;
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state, payload) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      });
  },
});

export default AuthSlice.reducer;
