import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import PlayingProcess from 'components/PlayingProcess';
import { useSong } from 'hooks/useSong';

// import sk from '../music/sk.mp3';

import { songs } from 'songs';

const GamePage = ({ players }) => {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState({
    name: players.firstPlayer,
    score: 0,
    isPlayerPlayingNow: true,
  });
  const [player2, setPlayer2] = useState({
    name: players.secondPlayer,
    score: 0,
    isPlayerPlayingNow: false,
  });
  const { song } = useSong(songs, player1.isPlayerPlayingNow);

  useEffect(() => {
    if (player1.name === '' && player2.name === '') {
      navigate('/');
    }
  });

  return (
    <PageContainer>
      <PlayerInfo players={[player1, player2]} />
      <PlayingProcess
        song={song}
        player1={{ info: player1, setInfo: setPlayer1 }}
        player2={{ info: player2, setInfo: setPlayer2 }}
        // play={play}
        // stop={stop}
      />
    </PageContainer>
  );
};

export default GamePage;
