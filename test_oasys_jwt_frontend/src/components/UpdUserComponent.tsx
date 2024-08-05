import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { IUser } from '../app/models/IUser';
import { deselectUser, editSelectedUser, getUserBalance, updUser } from '../app/features/UserSlice';
import { setEditingPage } from '../app/features/NavigationSlice';

type Props = {};

export default function UpdUserComponent({}: Props) {
  const dispatch: AppDispatch = useDispatch();

  // * this is editable state of user
  const selectedUser: IUser | null = useSelector((state: RootState) => state.users.selectedUser);
  // * we also clear it's hashed password to set empty field (that dont produce update if we dont text in it)
  useEffect(() => {
    dispatch(editSelectedUser({ key: 'password', value: '' }));
  }, []);

  //* close context-meny of editing
  const handleDeselect = () => {
    dispatch(deselectUser());
    dispatch(setEditingPage());
  };

  //* get balance of selected selectedUser
  const handleGetUserBalance = (id: string) => {
    dispatch(getUserBalance(id));
  };

  //* Saving changes
  const handleSubmit = () => {
    let user = selectedUser as IUser; // we do this for editing with no state-mutation

    return dispatch(updUser(user));
  };

  //* here we edit currentUser
  const handleEditUser = (key: keyof IUser, value: string | boolean | number) => {
    //* validate number request
    if (key === 'balance' && isNaN(Number(value))) {
      return;
    } else if (key === 'balance') {
      value = Number(value); // Преобразуем строку в число
    }
    dispatch(editSelectedUser({ key, value }));
  };

  const FragmentHiddenBalance = () => {
    return (
      <div
        onClick={() => handleGetUserBalance(selectedUser?._id as string)}
        className="p-2 w-full my-4 bg-slate-200">
        {' '}
        balance{' '}
      </div>
    );
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
            value={selectedUser?.password}
            onChange={(e) => handleEditUser('password', e.target.value)}
            className="p-2 w-full my-4 bg-slate-200"
            placeholder="Password"
          />

          {
            //! BALANCE DISPLAY SECTION
            selectedUser?.balance === null ? (
              <FragmentHiddenBalance />
            ) : (
              <input
                value={selectedUser?.balance}
                onChange={(e) => handleEditUser('balance', e.target.value)}
                className="p-2 w-full my-4 bg-slate-200"
                placeholder="Balance"
              />
            )
          }

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
