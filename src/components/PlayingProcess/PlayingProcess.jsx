import { useState, useEffect } from 'react';

import GameField from 'components/GameField';
import RoundInfo from 'components/RoundInfo';

const PlayingProcess = ({
  song,
  player1,
  player2,
  typeOfConnection,
  webSocket,
}) => {
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

    // console.log(player2);
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
    changePlayingPlayer();
    setGameProcess('playingNow');

    setCurrentScore(6);

    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-changePlayer', {
      data: 'll',
    });
  };

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
      console.log(data);
      setCurrentScore(data.currentScore);
      // decreaseScore();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-changePlayer', data => {
      console.log(data);
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
  }, [webSocket]);

  useEffect(() => {
    if (currentScore === 0) {
      setGameProcess('endRoundNull');
    }
  }, [currentScore]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-gameProcess', {
      gameProcess,
    });
  }, [gameProcess, player1.info.isPlayerPlayingNow, webSocket]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-gameProcess', data => {
      setGameProcess(data.gameProcess);
    });
  }, [player1.info.isPlayerPlayingNow, webSocket]);

  switch (gameProcess) {
    case 'playingNow':
      return (
        <GameField
          song={song}
          decreaseScore={decreaseScore}
          score={currentScore}
          setPlayerScore={setPlayerScore}
          setGameProcess={setGameProcess}
          // changePlayingPlayer={changePlayingPlayer}
          typeOfConnection={typeOfConnection}
          webSocket={webSocket}
          player1={player1}
          // play={play}
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
          isMulti={webSocket === null ? false : true}
          isYourTurn={player1.info.isPlayerPlayingNow}
          // stop={stop}
        />
      );

    default:
      break;
  }
};

export default PlayingProcess;
