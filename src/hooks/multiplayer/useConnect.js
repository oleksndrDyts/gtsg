/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const useConnect = ({
  multiInfo,
  typeOfConnection,
  setPlayers,
  password,
  setPassToJoin,
  isFirstRender,
}) => {
  const navigate = useNavigate();

  const connect = () => {
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

  return { connect };
};

export default useConnect;
