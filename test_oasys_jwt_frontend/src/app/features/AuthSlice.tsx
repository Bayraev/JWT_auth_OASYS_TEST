import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { IAuthCredentials, IRegCredentials } from '../models/IAuth';
import AuthService from '../services/AuthService';
import Cookies from 'js-cookie';
import { sleep, unshiftAfterMs } from '../tools/asyncTools';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

interface IInitialState {
  currentUser: IUser | null;
  users: IUser[];
  loading?: any;
  error: any;
}

const initialState: IInitialState = {
  currentUser: null,
  users: [
    {
      _id: '',
      nickname: '',
      password: '',
      type: 1,
      lvl: 1,
      balance: 0,
    },
  ],
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

export const getCurrentUserById = createAsyncThunk(
  'auth/getCurrentUserById',
  async (idToSearch: string) => {
    // Credentials (cookies) included
    const responce = await AuthService.getCurrentUserById(idToSearch);
    alert('done');
    return responce.data;
  },
);

export const getUsers = createAsyncThunk('auth/getUsers', async () => {
  // Credentials (cookies) included
  const responce = await AuthService.getUsers();
  alert('getUsers');
  return responce.data;
});

//* handler for addCases (rejection)
// export const handleRejected = (message: string) => (dispatch: AppDispatch) => {
//   dispatch(addError(message));
//   setTimeout(() => {
//     dispatch(removeError());
//   }, 500);
// };

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('token');

      state.currentUser = null;
      state.users.splice(0, state.users.length);
    },
    addError: (state, action: PayloadAction<string>) => {
      state.error.push(action.payload);
    },
    removeError: (state) => {
      state.error.pop();
    },

    // actionGetMeUser: (state) => {
    //   const user = JSON.parse(localStorage.getItem('user') || '{}');
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state, payload) => {
        state.loading = true;
        state.error.splice(0, state.error.length);
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.error.splice(0, state.error.length);
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      .addCase(authorization.pending, (state, payload) => {
        state.loading = true;
        state.error.splice(0, state.error.length);
      })
      .addCase(authorization.fulfilled, (state, action: PayloadAction<any>) => {
        localStorage.setItem('currentUserId', action.payload._id);
        state.currentUser = action.payload; //! khmmm
        state.loading = false;
        state.error.splice(0, state.error.length);
      })
      .addCase(authorization.rejected, (state, action) => {
        state.loading = false;
        alert(action.error.message);
        state.error.push(action.error.message);
      })

      //* getCurrentUserById
      .addCase(getCurrentUserById.pending, (state, payload) => {
        state.loading = true;
        state.error.splice(0, state.error.length);
      })
      .addCase(getCurrentUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload; //! khmmm
        state.loading = false;
        state.error.splice(0, state.error.length);
      })
      .addCase(getCurrentUserById.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      //* getUsers
      .addCase(getUsers.pending, (state, payload) => {
        state.loading = true;
        state.error.splice(0, state.error.length);
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload.map((user: IUser) => user); //! khmmm
        state.loading = false;
        state.error.splice(0, state.error.length);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      });
  },
});

export const { logout, removeError } = AuthSlice.actions;
export default AuthSlice.reducer;
