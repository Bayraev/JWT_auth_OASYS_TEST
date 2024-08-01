import { ArrowLeftRight } from 'lucide-react';
import React, { useState } from 'react';

export default function AuthComponent() {
  const [isRegistration, setIsRegistration] = useState(true);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(1); // admin(1) and user(2)
  const [lvl, setLvl] = useState(1); // lvl 1,2 for user and 1,2,3 for admin

  const handleSubmit = () => {
    if (nickname.length === 0) {
      return alert('why empty nickname');
    }
    if (password.length < 6) {
      return alert('why password too short');
    }
    if (isRegistration === true) {
      return alert('registration');
    }
    if (isRegistration === false) {
      return alert('authorization');
    }
  };

  return (
    <div className="p-20">
      <div className="bg-slate-100 p-4">
        <h1 className="flex">
          <span className="mx-4 select-none">
            {isRegistration ? 'Registration' : 'Autorization'}
          </span>{' '}
          <ArrowLeftRight onClick={() => setIsRegistration(!isRegistration)} />
        </h1>
        <div>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="p-2 w-full my-4 bg-slate-200"
            placeholder="Nickname"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full my-4 bg-slate-200"
            placeholder="Password"
          />
          {isRegistration && (
            <div>
              <div className="my-4">
                <span> Type: </span>
                <button
                  onClick={() => setType(1)}
                  className={`p-2 my-4 mx-2 ${type === 1 && `bg-blue-100`}`}>
                  {' '}
                  admin(1){' '}
                </button>
                <button
                  onClick={() => {
                    setLvl(1);
                    setType(2);
                  }}
                  className={`p-2 my-4 mx-2 ${type === 2 && `bg-blue-100`}`}>
                  {' '}
                  user(2){' '}
                </button>
              </div>
              <div>
                <span> Lvl: </span>
                <button
                  onClick={() => setLvl(1)}
                  className={`p-2 my-4 mx-2  ${lvl === 1 && `bg-blue-100`}`}>
                  {' '}
                  1 lvl{' '}
                </button>
                <button
                  onClick={() => setLvl(2)}
                  className={`p-2 my-4 mx-2  ${lvl === 2 && `bg-blue-100`}`}>
                  {' '}
                  2 lvl{' '}
                </button>
                {type === 1 && (
                  <button
                    onClick={() => setLvl(3)}
                    className={`p-2 my-4 mx-2  ${lvl === 3 && `bg-blue-100`}`}>
                    {' '}
                    3 lvl{' '}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <button onClick={handleSubmit} className="p-2 my-4 bg-red-600 text-slate-200">
          {' '}
          Submit{' '}
        </button>
      </div>
    </div>
  );
}
