import { useState, useEffect } from 'react';

import GameField from 'components/GameField';
import RoundInfo from 'components/RoundInfo';

const PlayingProcess = ({ song, player1, player2, play, stop }) => {
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
    setGameProcess('playingNow');
    changePlayingPlayer();
    setCurrentScore(6);
  };

  useEffect(() => {
    if (currentScore === 0) {
      setGameProcess('endRoundNull');
    }
  }, [currentScore]);

  switch (gameProcess) {
    case 'playingNow':
      return (
        <GameField
          song={song}
          decreaseScore={decreaseScore}
          score={currentScore}
          setPlayerScore={setPlayerScore}
          setGameProcess={setGameProcess}
          changePlayingPlayer={changePlayingPlayer}
          play={play}
        />
      );

    case 'endRoundWon':
    case 'endRoundLost':
    case 'endRoundNull':
      return (
        <RoundInfo
          song={song}
          info={gameProcess}
          nextRound={nextRound}
          score={currentScore}
          stop={stop}
        />
      );

    default:
      break;
  }
};

export default PlayingProcess;
