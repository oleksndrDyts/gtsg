import { useEffect } from 'react';

const usePlayingProcessIo = (
  webSocket,
  currentScore,
  player1,
  setCurrentScore,
  changePlayingPlayer,
  player2,
  gameProcess,
  setGameProcess
) => {
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.emit('set-changeScore', {
      currentScore,
      player: player1.info.isPlayerPlayingNow,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScore]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-changeScore', data => {
      setCurrentScore(data.currentScore);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-changePlayer', data => {
      changePlayingPlayer();
      player1.setInfo(prevState => {
        const newState = { ...prevState };
        newState.isPlayerPlayingNow = true;
        return newState;
      });
      player2.setInfo(prevState => {
        const newState = { ...prevState };
        newState.isPlayerPlayingNow = false;
        return newState;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-gameProcess', {
      gameProcess,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [gameProcess, player1.info.isPlayerPlayingNow, webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-gameProcess', data => {
      setGameProcess(data.gameProcess);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1.info.isPlayerPlayingNow, webSocket]);

  const changePlayerIo = () => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-changePlayer', {
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  };

  return { changePlayerIo };
};

export default usePlayingProcessIo;
