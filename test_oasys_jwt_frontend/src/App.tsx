import { LogIn } from 'lucide-react';
import React, { useEffect } from 'react';
import AuthComponent from './components/AuthComponent';
import UsersComponent from './components/UsersComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setSelectedComponent } from './app/features/NavigationSlice';
import { logout, removeError as authRemoveError } from './app/features/AuthSlice';
import { sleep } from './app/tools/asyncTools';
import UpdUserComponent from './components/UpdUserComponent';
import { clearAfterLogout, removeError as userRemoveError } from './app/features/UserSlice';

function App() {
  const dispatch: AppDispatch = useDispatch();
  //* Navigation
  const { selectedComponent, editingPage } = useSelector((state: RootState) => state.navigation);
  //* User logic
  const { error: userError } = useSelector((state: RootState) => state.users);
  //* Auth logic
  const { error: authError } = useSelector((state: RootState) => state.authorization);

  // logout and login button handler
  const authOrLeaveHandler = () => {
    // when we want log in, we logout automatically
    dispatch(logout());
    dispatch(clearAfterLogout());
    dispatch(setSelectedComponent('auth'));
  };

  //* Clean error arr
  useEffect(() => {
    (async () => {
      await sleep(3000);
      dispatch(userRemoveError());
      dispatch(authRemoveError());
    })();
  }, [userError, authError]);

  return (
    <>
      {userError.map((el: any) => (
        // errors field
        <div className="flex justify-center p-2 bg-red-600">ERROR: {el}</div>
      ))}
      {authError.map((el: any) => (
        // errors field
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
