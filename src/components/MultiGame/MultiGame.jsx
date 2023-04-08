/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { useNavigate } from 'react-router-dom';

const MultiGame = ({
  multiInfo,
  setPlayers,
  typeOfConnection,
  setTypeOfConnection,
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
      const newSocket = io.connect(
        'https://gtsg-io-production.up.railway.app/'
      );
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
      <label>
        створити
        <input
          type="radio"
          value="create"
          checked={typeOfConnection === 'create'}
          onChange={handleChange}
        />
      </label>
      <label>
        підключитись
        <input
          type="radio"
          value="connect"
          checked={typeOfConnection === 'connect'}
          onChange={handleChange}
        />
      </label>

      {typeOfConnection === 'create' ? (
        <>
          <button
            type="button"
            onClick={connect}
            disabled={multiInfo.playerName !== '' ? false : true}
          >
            Створити кімнату
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={connect}
            disabled={
              password !== '' && multiInfo.playerName !== '' ? false : true
            }
          >
            Приєднатись
          </button>
        </>
      )}

      {typeOfConnection === 'connect' && (
        <input
          type="text"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      )}
      <p>{passToJoin}</p>
    </>
  );
};

export default MultiGame;
