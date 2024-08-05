import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { IAuthCredentials, IRegCredentials } from '../models/IAuth';
import AuthService from '../services/AuthService';
import Cookies from 'js-cookie';

interface IInitialState {
  loading: any;
  error: any;
}

const initialState: IInitialState = {
  loading: [],
  error: [],
};

export const registration = createAsyncThunk(
  'auth/registration',
  async (credentials: IRegCredentials) => {
    credentials.nickname = credentials.nickname.toLowerCase(); // we dont want BIG CHARS
    const responce = await AuthService.registration(credentials);
    return responce.data;
  },
);

export const authorization = createAsyncThunk('', async (credentials: IAuthCredentials) => {
  credentials.nickname = credentials.nickname.toLowerCase(); // we dont want BIG CHARS
  const responce = await AuthService.authorization(credentials);
  return responce.data;
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error.pop();
    },
    logout: (state) => {
      Cookies.remove('token');
      localStorage.removeItem('currentUserId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      .addCase(authorization.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authorization.fulfilled, (state, action: PayloadAction<any>) => {
        localStorage.setItem('currentUserId', action.payload._id);
        state.loading = false;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false;
        alert(action.error.message);
        state.error.push(action.error.message);
      });
  },
});

export const { logout, removeError } = AuthSlice.actions;
export default AuthSlice.reducer;
