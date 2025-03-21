import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  getCurrentUserById,
  getUserBalance,
  getUsers,
  selectUser,
} from '../app/features/UserSlice';
import { IUser } from '../app/models/IUser';
import { setEditingPage } from '../app/features/NavigationSlice';
import { Pen } from 'lucide-react';

export default function UsersComponent() {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser, users } = useSelector((state: RootState) => state.users);

  //* get current user
  const currentUserId: string | any = localStorage.getItem('currentUserId');
  useEffect(() => {
    if (currentUserId) {
      dispatch(getCurrentUserById(currentUserId));
    }
  }, [currentUserId]);

  //* get ALL users
  const handleGetUsers = () => {
    dispatch(getUsers());
  };

  //* get user balance
  const handleGetUserBalance = (id: string) => {
    dispatch(getUserBalance(id));
  };

  //* select user for context meny
  const handleSelectUser = (user: IUser) => {
    dispatch(selectUser(user)); // we put selected to state.currentUser
    dispatch(setEditingPage()); // we turn on context meny to edit state.currentUser
  };

  const FragmentUser: React.FC<IUser> = (user: IUser) => {
    return (
      <div className="flex justify-center my-4 bg-slate-200">
        <div className="flex justify-between w-[90%] p-4">
          <section className="flex ">
            <Pen
              className="relative top-[15px] right-[30px]"
              onClick={() => handleSelectUser(user)}
            />

            <div>
              <span className="block text-red-600">{user.nickname}</span>
              <span className="block">
                {user.type === 1 ? 'admin' : 'user'} and lvl {user.lvl}
              </span>
            </div>
          </section>
          <button
            className="bg-slate-400 p-2 min-w-32"
            onClick={() => handleGetUserBalance(user._id)}>
            {' '}
            {user.balance !== null ? user.balance : 'Баланс'}{' '}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-20">
      <div className="bg-slate-100 p-4">
        {currentUser && <FragmentUser {...currentUser} />}
        <div className="flex justify-center">
          <button onClick={handleGetUsers} className="p-2 bg-red-400 text-slate-200">
            Try Get Users
          </button>
        </div>

        {users.map((user: IUser) => {
          return <FragmentUser key={user._id} {...user} />;
        })}
      </div>
    </div>
  );
}
