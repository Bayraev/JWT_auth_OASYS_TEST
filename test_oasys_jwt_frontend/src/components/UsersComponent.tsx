import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getCurrentUserById, getUsers } from '../app/features/AuthSlice';
import Cookies from 'js-cookie';
import { IUser } from '../app/models/IUser';

export default function UsersComponent() {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser, users } = useSelector((state: RootState) => state.authorization);

  //* Getting Current User
  useLayoutEffect(() => {
    console.log(Cookies.get('token'));
    const currentUserId: string | any = localStorage.getItem('currentUserId');
    if (currentUserId && typeof currentUserId === typeof '') {
      console.log(currentUserId);
      dispatch(getCurrentUserById(currentUserId));
    }
  }, []);

  const handleGetUsers = () => {
    dispatch(getUsers());
  };

  const FragmentUser: React.FC<IUser> = (user: IUser) => {
    return (
      <div className="flex justify-center my-4 bg-slate-200">
        <div className="flex justify-between w-[90%] p-4">
          <div>
            <span className="block text-red-600">{user.nickname}</span>
            <span className="block">
              {user.type === 1 ? 'admin' : 'user'} and lvl {user.lvl}
            </span>
          </div>
          <button className="bg-slate-400 p-2"> {user.balance ? user.balance : 'Баланс'} </button>
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

        {users &&
          users.map((user: IUser) => {
            return <FragmentUser {...user} />;
          })}
      </div>
    </div>
  );
}
