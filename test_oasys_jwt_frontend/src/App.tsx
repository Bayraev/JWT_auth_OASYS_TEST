import { LogIn } from 'lucide-react';
import React, { useEffect } from 'react';
import AuthComponent from './components/AuthComponent';
import UsersComponent from './components/UsersComponent';
import UpdUserComponent from './components/UpdUserComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setEditingPage, setSelectedComponent } from './app/features/NavigationSlice';
import Cookies from 'js-cookie';
import { logout } from './app/features/AuthSlice';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { selectedComponent, editingPage } = useSelector((state: RootState) => state.navigation);

  const authOrLeaveHandler = () => {
    // WHEN WE GO TO LOGIN, WE LOGOUT BEFORE
    dispatch(logout());
    dispatch(setSelectedComponent('auth'));
  };

  return (
    <div className="flex justify-center">
      <div className="w-[70%]">
        <header className="flex justify-between bg-slate-600 p-2 text-3xl">
          <h1 className="font-bold underline text-slate-200">Hello world!</h1>
          <LogIn onClick={authOrLeaveHandler} className="text-slate-200 m-2" />
        </header>
        <main className="bg-slate-400 h-screen">
          {/* Some routing system lmao, its landing rn */}
          {selectedComponent === 'auth' && <AuthComponent />}
          {selectedComponent === 'users' && <UsersComponent />}
          {/* {editingPage && <UpdUserComponent />} */}
        </main>
      </div>
    </div>
  );
}

export default App;
