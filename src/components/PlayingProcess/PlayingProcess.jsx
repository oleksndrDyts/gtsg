import GameField from 'components/GameField';
import RoundInfo from 'components/RoundInfo';
import EndGame from 'components/EndGame';

import { usePlayingProcess } from 'hooks/usePlayingProcess';

import SwitchComponent from 'components/SwitchComponent';

const PlayingProcess = ({
  song,
  player1,
  player2,
  typeOfConnection,
  webSocket,
}) => {
  const {
    gameProcess,
    currentScore,
    setPlayerScore,
    decreaseScore,
    setGameProcess,
    nextRound,
  } = usePlayingProcess(player1, player2, webSocket);

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
              key={1}
            />,
          ],
        },
      ]}
    />
  );
};

export default PlayingProcess;
