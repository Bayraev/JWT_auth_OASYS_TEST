import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { IAuthCredentials, IRegCredentials } from '../models/IAuth';
import AuthService from '../services/AuthService';
import Cookies from 'js-cookie';

interface IInitialState {
  currentUser: IUser | null;
  selectedUser: IUser | null;
  users: IUser[];
  loading?: any;
  error: any;
}

const initialState: IInitialState = {
  currentUser: null,
  selectedUser: null,
  users: [],
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
    logout: (state) => {
      Cookies.remove('token');

      state.currentUser = null;
      state.users.splice(0, state.users.length);
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
        state.currentUser = action.payload; //! khmmm
        state.loading = false;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false;
        alert(action.error.message);
        state.error.push(action.error.message);
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
