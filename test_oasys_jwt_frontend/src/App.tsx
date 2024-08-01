import { LogIn } from 'lucide-react';
import React, { useState } from 'react';
import AuthComponent from './components/AuthComponent';
import UsersComponent from './components/UsersComponent';

function App() {
  const [selectedComponent, isSelectedComponent] = useState('users'); // shows selectedComponent
  const [isEditingRn, setIsEditingRn] = useState(false); // shows are we opened window of edititng user
  return (
    <div className="flex justify-center">
      <div className="w-[70%]">
        <header className="flex justify-between bg-slate-600 p-2 text-3xl">
          <h1 className="font-bold underline text-slate-200">Hello world!</h1>
          <LogIn className="text-slate-200 m-2" />
        </header>
        <main className="bg-slate-400 h-screen">
          {/* Some routing system lmao, its landing rn */}
          {selectedComponent === 'auth' && <AuthComponent />}
          {selectedComponent === 'users' && <UsersComponent />}
        </main>
      </div>
    </div>
  );
}

export default App;
