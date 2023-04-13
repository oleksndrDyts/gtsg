/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import css from './MultiGame.module.css';

import { useNavigate } from 'react-router-dom';

const MultiGame = ({
  multiInfo,
  setPlayers,
  typeOfConnection,
  setTypeOfConnection,
  children,
}) => {
  const [password, setPassword] = useState('');
  const isFirstRender = useRef(true);
  const [passToJoin, setPassToJoin] = useState('none');
  const navigate = useNavigate();

  const connect = () => {
    // console.log(socket);
    if (typeOfConnection === 'create') {
      multiInfo.webSocket.emit('create', {
        isFirstPlayer: typeOfConnection === 'create' ? true : false,

        playerName: multiInfo.playerName,
      });
    } else {
      multiInfo.webSocket.emit('join', {
        playerName: multiInfo.playerName,
        password,
      });
      multiInfo.webSocket.emit('get-data', {});
    }
    // console.log();
  };

  const handleChange = e => {
    setTypeOfConnection(e.target.value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // const newSocket = io.connect(
      //   'https://gtsg-io-production.up.railway.app/'
      // );
      const newSocket = io.connect('http://localhost:5000');
      multiInfo.setWebSocket(newSocket);
    }
    isFirstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (multiInfo.webSocket === null) {
      return;
    }
    multiInfo.webSocket.on('room-pass', password => {
      setPassToJoin(password);
    });
  }, [multiInfo.webSocket]);

  useEffect(() => {
    if (multiInfo.webSocket === null) {
      return;
    }

    multiInfo.webSocket.on('get-data', data => {
      if (typeOfConnection === 'create') {
        setPlayers.setSecondPlayerName(data.secondPlayerName);
        return;
      }

      setPlayers.setSecondPlayerName(data.firstPlayerName);
    });
  }, [multiInfo.webSocket, typeOfConnection]);

  useEffect(() => {
    if (multiInfo.webSocket === null) {
      return;
    }

    multiInfo.webSocket.on('start-game', data => {
      navigate('/game');
    });
  }, [multiInfo.webSocket]);

  return (
    <>
      <div className={css.inputContainer}>
        <label
          className={`${css.label} ${
            typeOfConnection === 'create' ? css.active : ''
          }`}
        >
          Створеня
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
