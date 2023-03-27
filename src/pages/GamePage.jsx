import { useState } from 'react';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import GameField from 'components/GameField';

const song = {
  artist: 'Скрябін',
  text: ['Спи', 'собі', 'сама', 'коли', 'біля', 'тебе'],
};

const GamePage = () => {
  const [player1, setPlayer1] = useState({
    name: 'Sasha',
    score: 0,
  });
  const [player2, setPlayer2] = useState({
    name: 'Nadya',
    score: 0,
  });

  const [gameOngoingInfo, setGameOngoingInfo] = useState({
    player1PlayingNow: true,
    gameProcess: 'pending',
  });

  return (
    <PageContainer>
      <PlayerInfo
        player={gameOngoingInfo.player1PlayingNow ? player1 : player2}
      />
      <GameField
        song={song}
        player={gameOngoingInfo.player1PlayingNow ? player1 : player2}
      />
    </PageContainer>
  );
};

export default GamePage;
