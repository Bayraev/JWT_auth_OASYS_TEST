import { LogIn } from 'lucide-react';
import React, { useEffect } from 'react';
import AuthComponent from './components/AuthComponent';
import UsersComponent from './components/UsersComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setSelectedComponent } from './app/features/NavigationSlice';
import { logout, removeError } from './app/features/AuthSlice';
import { sleep } from './app/tools/asyncTools';
import UpdUserComponent from './components/UpdUserComponent';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { selectedComponent, editingPage } = useSelector((state: RootState) => state.navigation);
  const { currentUser, error } = useSelector((state: RootState) => state.authorization);
  let errorCleanTimer: number = 0;
  const authOrLeaveHandler = () => {
    // WHEN WE GO TO LOGIN, WE LOGOUT BEFORE
    dispatch(logout());
    dispatch(setSelectedComponent('auth'));
  };

  useEffect(() => {
    (async () => {
      const currentErrorState = error;
      await sleep(3000);

      dispatch(removeError());
    })();

    // setTimeout(() => {
    //   errorCleanTimer ===
    // }, 3000);
  }, [error]);

  return (
    <>
      {error.map((el: any) => (
        <div className="flex justify-center p-2 bg-red-600">ERROR: {el}</div>
      ))}
      <div className="flex justify-center h-full">
        <div className="w-[70%] h-full">
          <header className="flex justify-between bg-slate-600 p-2 text-3xl">
            <h1
              onClick={() => dispatch(setSelectedComponent('users'))}
              className="font-bold underline text-slate-200">
              Hello world!
            </h1>
            <LogIn onClick={authOrLeaveHandler} className="text-slate-200 m-2" />
          </header>
          <main className="bg-slate-400 h-full">
            {/* Some routing system lmao, its landing rn */}
            {selectedComponent === 'auth' && <AuthComponent />}
            {selectedComponent === 'users' && <UsersComponent />}
            {editingPage && <UpdUserComponent />}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
