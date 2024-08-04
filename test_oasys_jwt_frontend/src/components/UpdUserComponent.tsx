import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { IUser } from '../app/models/IUser';
import { deselectUser, editSelectedUser, updUser } from '../app/features/UserSlice';
import { setEditingPage } from '../app/features/NavigationSlice';
import { deletePropertyFromObj } from '../app/tools/tools';

type Props = {};

export default function UpdUserComponent({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  // const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [type, setType] = useState<number>(1); // admin(1) and user(2)
  // const [lvl, setLvl] = useState<number>(1); // lvl 1,2 for user and 1,2,3 for admin

  const selectedUser: IUser | any = useSelector(
    (state: RootState) => state.authorization.selectedUser,
  );

  const handleDeselect = () => {
    dispatch(deselectUser());
    dispatch(setEditingPage());
  };

  const handleSubmit = () => {
    let user = selectedUser as IUser;
    if (user.nickname.length === 0) {
      return alert('why empty nickname');
    }
    if (password.length < 6) {
      user = deletePropertyFromObj(user, user.password);
    }
    console.log(user);
    return dispatch(updUser(user));
  };

  const handleEditUser = (key: keyof IUser, value: string | boolean | number) => {
    dispatch(editSelectedUser({ key, value }));
  };

  return (
    <div className="flex justify-center w-screen fixed top-40 left-0">
      <div className="bg-slate-100 p-4 border-2 ">
        <div>
          <input
            value={selectedUser?.nickname}
            onChange={(e) => handleEditUser('nickname', e.target.value)}
            className="p-2 w-full my-4 bg-slate-200"
            placeholder="Nickname"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full my-4 bg-slate-200"
            placeholder="Password"
          />
          <div>
            <div className="my-4">
              <span> Type: </span>
              <button
                onClick={() => handleEditUser('type', 1)}
                className={`p-2 my-4 mx-2 ${selectedUser?.type === 1 && `bg-blue-100`}`}>
                {' '}
                admin(1){' '}
              </button>
              <button
                onClick={() => {
                  handleEditUser('type', 2);
                  handleEditUser('lvl', 1);
                }}
                className={`p-2 my-4 mx-2 ${selectedUser?.type === 2 && `bg-blue-100`}`}>
                {' '}
                user(2){' '}
              </button>
            </div>
            <div>
              <span> Lvl: </span>
              <button
                onClick={() => handleEditUser('lvl', 1)}
                className={`p-2 my-4 mx-2  ${selectedUser?.lvl === 1 && `bg-blue-100`}`}>
                {' '}
                1 lvl{' '}
              </button>
              <button
                onClick={() => handleEditUser('lvl', 2)}
                className={`p-2 my-4 mx-2  ${selectedUser?.lvl === 2 && `bg-blue-100`}`}>
                {' '}
                2 lvl{' '}
              </button>
              {selectedUser?.type === 1 && (
                <button
                  onClick={() => handleEditUser('lvl', 3)}
                  className={`p-2 my-4 mx-2  ${selectedUser?.lvl === 3 && `bg-blue-100`}`}>
                  {' '}
                  3 lvl{' '}
                </button>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className="p-2 my-4 bg-red-600 text-slate-200">
          {' '}
          Submit{' '}
        </button>
        <button
          onClick={handleDeselect}
          className="p-2 my-4 mx-2 bg-slate-200 border-solid border-[1px] border-sky-500">
          {' '}
          Exit{' '}
        </button>
      </div>
    </div>
  );
}
