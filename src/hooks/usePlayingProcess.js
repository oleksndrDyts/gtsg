import { useState, useEffect } from 'react';

import usePlayingProcessIo from './multiplayer/usePlayingProcessIo';

export const usePlayingProcess = (player1, player2, webSocket) => {
  const [gameProcess, setGameProcess] = useState('playingNow');

  const changePlayingPlayer = () => {
    player1.setInfo(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow = !prevState.isPlayerPlayingNow;
      return newState;
    });
    player2.setInfo(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow = !prevState.isPlayerPlayingNow;
      return newState;
    });
  };

  const [currentScore, setCurrentScore] = useState(6);

  const { changePlayerIo } = usePlayingProcessIo(
    webSocket,
    currentScore,
    player1,
    setCurrentScore,
    changePlayingPlayer,
    player2,
    gameProcess,
    setGameProcess
  );

  const decreaseScore = () => {
    setCurrentScore(prevState => prevState - 1);
  };

  const setPlayerScore = () => {
    const player = player1.info.isPlayerPlayingNow ? player1 : player2;

    player.setInfo(prevState => {
      const newState = { ...prevState };
      newState.score = prevState.score += currentScore;
      return newState;
    });
  };

  const nextRound = () => {
    changePlayingPlayer();
    setGameProcess('playingNow');

    setCurrentScore(6);

    changePlayerIo();
  };

  useEffect(() => {
    if (currentScore === 0) {
      setGameProcess('endRoundNull');
    }
  }, [currentScore]);

  useEffect(() => {
    if (player1.info.score > 9) {
      setGameProcess('endGame');
    }
    if (player2.info.score > 9) {
      setGameProcess('endGame');
    }
  }, [player1.info.score, player2.info.score]);

  return {
    gameProcess,
    decreaseScore,
    currentScore,
    setPlayerScore,
    setGameProcess,
    nextRound,
  };
};
