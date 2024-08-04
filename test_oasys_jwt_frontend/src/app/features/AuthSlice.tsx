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

export const getUserBalance = createAsyncThunk(
  'auth/getUserBalance',
  async (idToSearch: string) => {
    const responce = await AuthService.getUserBalance(idToSearch);
    return responce.data;
  },
);

export const updUser = createAsyncThunk('auth/updUser', async (user: IUser) => {
  alert(user._id);
  const responce = await AuthService.updUser(user);
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
    // addError: (state, action: PayloadAction<string>) => {
    //   state.error.push(action.payload);
    // },
    removeError: (state) => {
      state.error.pop();
    },

    selectUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
    deselectUser: (state) => {
      state.selectedUser = null;
    },
    editSelectedUser: (
      state,
      action: PayloadAction<{ key: keyof IUser; value: string | boolean | number }>,
    ) => {
      const { key, value } = action.payload;
      if (state.selectedUser !== null) {
        state.selectedUser[key] = value as never;
      }
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
      })

      //* getCurrentUserById
      .addCase(getCurrentUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCurrentUserById.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentUser = action.payload; //! khmmm
        state.loading = false;
      })
      .addCase(getCurrentUserById.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      //* getUsers
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload.map((user: IUser) => user); //! khmmm
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      //* getBalance
      //* getUsers
      .addCase(getUserBalance.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getUserBalance.fulfilled,
        (state, action: PayloadAction<{ _id: string; balance: number }>) => {
          const { _id, balance } = action.payload;

          if (state.currentUser?._id === _id) {
            state.currentUser.balance = balance;
          }

          // check all users to show balance
          state.users = state.users.map((user) => {
            if (user._id === _id) user.balance = balance; // if equal user and payload we change the balance
            return user;
          });

          console.log(action.payload);
          state.loading = false;
        },
      )
      .addCase(getUserBalance.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      })

      //* updUser
      .addCase(updUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const { _id, balance } = action.payload;

        if (state.currentUser?._id === _id) {
          state.currentUser.balance = balance;
        }

        // check all users to show balance
        state.users = state.users.map((user) => {
          console.log(action.payload);
          if (user._id === _id) {
            user = { ...action.payload };
            console.log(user);
          } // if equal user and payload we change the balance
          return user;
        });

        state.loading = false;
      })
      .addCase(updUser.rejected, (state, action) => {
        state.loading = false;
        state.error.push(action.error.message);
      });
  },
});

export const { logout, removeError, selectUser, deselectUser, editSelectedUser } =
  AuthSlice.actions;
export default AuthSlice.reducer;
