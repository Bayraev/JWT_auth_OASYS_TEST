import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';

export default function UsersComponent() {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.authorization);

  return (
    <div className="p-20">
      <div className="bg-slate-100 p-4">
        <div className="flex justify-center my-4 bg-slate-200">
          <div className="flex justify-between w-[90%] p-4">
            <div>
              <span className="block text-red-600">{currentUser?.nickname}</span>
              <span className="block">
                {currentUser?.type === 1 ? 'admin' : 'user'} and lvl {currentUser?.lvl}
              </span>
            </div>
            <button className="bg-slate-400 p-2"> Balance </button>
          </div>
        </div>

        <div className="flex justify-center my-4 bg-slate-200">
          <div className="flex justify-between w-[90%] p-4">
            <div>
              <span className="block">Ali</span>
              <span className="block">(1-2)</span>
            </div>
            <button className="bg-slate-400 p-2"> Balance </button>
          </div>
        </div>
        <div className="flex justify-center my-4 bg-slate-200">
          <div className="flex justify-between w-[90%] p-4">
            <div>
              <span className="block">Ali</span>
              <span className="block">(1-2)</span>
            </div>
            <button className="bg-slate-400 p-2"> Balance </button>
          </div>
        </div>
      </div>
    </div>
  );
}
