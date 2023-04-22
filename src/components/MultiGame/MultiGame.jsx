/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from 'react';

import useConnect from 'hooks/multiplayer/useConnect';

import css from './MultiGame.module.css';

const MultiGame = ({
  multiInfo,
  setPlayers,
  typeOfConnection,
  setTypeOfConnection,
  children,
  gameType,
}) => {
  const [password, setPassword] = useState('');
  const isFirstRender = useRef(true);
  const [passToJoin, setPassToJoin] = useState('none');

  const handleChange = e => {
    setTypeOfConnection(e.target.value);
  };

  const { connect } = useConnect({
    multiInfo,
    typeOfConnection,
    setPlayers,
    password,
    setPassToJoin,
    isFirstRender,
  });

  // useEffect(() => {
  //   if (multiInfo.webSocket === null) {
  //     return;
  //   }

  //   return () => {
  //     multiInfo.webSocket.disconnect();
  //   };
  // }, []);

  return (
    <>
      <div className={css.inputContainer}>
        <label
          className={`${css.label} ${
            typeOfConnection === 'create' ? css.active : ''
          }`}
        >
          Створення
          <input
            className={css.input}
            type="radio"
            value="create"
            checked={typeOfConnection === 'create'}
            onChange={handleChange}
          />
        </label>
        <label
          className={`${css.label} ${
            typeOfConnection === 'connect' ? css.active : ''
          }`}
        >
          Підключення
          <input
            className={css.input}
            type="radio"
            value="connect"
            checked={typeOfConnection === 'connect'}
            onChange={handleChange}
          />
        </label>
      </div>

      {children}
      {typeOfConnection === 'connect' && (
        <>
          <label htmlFor="pass" className={css.passLabel}>
            Пароль кімнати
          </label>
          <input
            className={css.passInput}
            type="text"
            autoComplete="off"
            value={password}
            id="pass"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </>
      )}

      {typeOfConnection === 'create' ? (
        <>
          <button
            className={`${css.btnCreate} ${
              multiInfo.playerName !== '' ? css.notDisabled : css.disabled
            } ${css.creation}`}
            type="button"
            onClick={connect}
            disabled={multiInfo.playerName !== '' ? false : true}
          >
            Створити кімнату
          </button>
        </>
      ) : (
        <>
          {typeOfConnection !== null && (
            <button
              className={`${css.btnCreate} ${
                password !== '' && multiInfo.playerName !== ''
                  ? css.notDisabled
                  : css.disabled
              }`}
              type="button"
              onClick={connect}
              disabled={
                password !== '' && multiInfo.playerName !== '' ? false : true
              }
            >
              Приєднатись
            </button>
          )}
        </>
      )}

      {passToJoin !== 'none' && typeOfConnection === 'create' && (
        <p>Пароль для входу: {passToJoin}</p>
      )}
    </>
  );
};

export default MultiGame;
