/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useGameFieldMulti = (
  webSocket,
  playerSongText,
  player1,
  comparedResult,
  isPlayerWon,
  isResultCompared,
  typeOfConnection,
  setPlayerSongText,
  setComparedResult,
  setPlayerWon,
  setResultCompared
) => {
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.emit('set-playerSongText', {
      playerSongText,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [playerSongText, typeOfConnection]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.emit('set-comparedResult', {
      comparedResult,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [comparedResult, typeOfConnection]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-isPlayerWon', {
      isPlayerWon,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [isPlayerWon, typeOfConnection]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-isResultCompared', {
      isResultCompared,
      isPlaying: player1.info.isPlayerPlayingNow,
    });
  }, [isResultCompared]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.on('get-playerSongText', data => {
      setPlayerSongText(data);
    });
  }, [webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.on('get-comparedResult', data => {
      setComparedResult(data);
    });
  }, [webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.on('get-isPlayerWon', data => {
      setPlayerWon(data);
    });
  }, [webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }
    webSocket.on('get-isResultCompared', data => {
      setResultCompared(data);
    });
  }, [webSocket]);
};

export default useGameFieldMulti;
