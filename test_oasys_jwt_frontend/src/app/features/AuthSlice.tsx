import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { IAuthCredentials, IRegCredentials } from '../models/IAuth';
import AuthService from '../services/AuthService';
import Cookies from 'js-cookie';

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
    return responce.data;
  },
);

export const authorization = createAsyncThunk(
  'auth/authorization',
  async (credentials: IAuthCredentials) => {
    credentials.nickname = credentials.nickname.toLowerCase(); // we dont want BIG CHARS
    const responce = await AuthService.authorization(credentials);
    const token = Cookies.get('token');
    return responce.data;
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      Cookies.remove('token');
    },
  },
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
      })

      .addCase(authorization.pending, (state, payload) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = null;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false;
        alert(action.error.message);
        state.error = action.error.message ?? 'An error occurred.';
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
