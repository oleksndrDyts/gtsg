import { useState, useEffect } from 'react';

import GameField from 'components/GameField';
import RoundInfo from 'components/RoundInfo';
import EndGame from 'components/EndGame';

import usePlayingProcess from 'hooks/multiplayer/usePlayingProcess';

import SwitchComponent from 'components/SwitchComponent';

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
  };

  const [currentScore, setCurrentScore] = useState(6);

  const { changePlayerIo } = usePlayingProcess(
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

  return (
    <SwitchComponent
      caseTo={gameProcess}
      arrayOfItems={[
        {
          caseTo: 'playingNow',
          childs: [
            <GameField
              key={1}
              song={song}
              decreaseScore={decreaseScore}
              score={currentScore}
              setPlayerScore={setPlayerScore}
              setGameProcess={setGameProcess}
              typeOfConnection={typeOfConnection}
              webSocket={webSocket}
              player1={player1}
            />,
          ],
        },
        {
          caseTo: ['endRoundWon', 'endRoundLost', 'endRoundNull'],
          childs: [
            <RoundInfo
              key={2}
              song={song}
              info={gameProcess}
              nextRound={nextRound}
              score={currentScore}
              isMulti={webSocket === null ? false : true}
              isYourTurn={player1.info.isPlayerPlayingNow}
            />,
          ],
        },
        {
          caseTo: 'endGame',
          childs: [
            <EndGame
              player1={player1.info}
              player2={player2.info}
              webSocket={webSocket}
            />,
          ],
        },
      ]}
    />
  );
};

export default PlayingProcess;
