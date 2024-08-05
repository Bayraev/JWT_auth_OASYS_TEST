import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';

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

export const getCurrentUserById = createAsyncThunk(
  'auth/getCurrentUserById',
  async (idToSearch: string) => {
    // Credentials (cookies) included
    const responce = await UserService.getCurrentUserById(idToSearch);
    return responce.data;
  },
);

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  // Credentials (cookies) included
  const responce = await UserService.getUsers();
  return responce.data;
});

export const getUserBalance = createAsyncThunk(
  'user/getUserBalance',
  async (idToSearch: string) => {
    const responce = await UserService.getUserBalance(idToSearch);
    return responce.data;
  },
);

export const updUser = createAsyncThunk('user/updUser', async (user: IUser) => {
  console.log(user.password);
  const responce = await UserService.updUser(user);
  return responce.data;
});

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    clearAfterLogout: (state) => {
      state.users.splice(0, state.users.length);
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(getUserBalance.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getUserBalance.fulfilled,
        (state, action: PayloadAction<{ _id: string; balance: number }>) => {
          const { _id, balance } = action.payload;
          const { currentUser, selectedUser, users } = state;

          //* for current user
          if (currentUser?._id === _id) {
            currentUser.balance = balance;
          }

          //* for selected user
          if (selectedUser?._id === _id) {
            selectedUser.balance = balance;
          }

          //* in all users find one
          state.users = state.users.map((user) => {
            if (user._id === _id) user.balance = balance; // if equal user and payload we change the balance
            return user;
          });
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
          if (user._id === _id) {
            user = { ...action.payload };
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

export const { removeError, selectUser, deselectUser, editSelectedUser, clearAfterLogout } =
  UserSlice.actions;
export default UserSlice.reducer;
