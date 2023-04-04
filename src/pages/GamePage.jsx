import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import PlayingProcess from 'components/PlayingProcess';

import sk from '../music/sk.mp3';

// import { songs } from 'songs';

// const song = {
//   artist: 'Скрябін',
//   text: ['Спи', 'собі', 'сама', 'коли', 'біля', 'тебе'],
//   track: 'Спи собі сама',
//   url: '../music/sk.mp3',
// };

const GamePage = ({ song }) => {
  const [player1, setPlayer1] = useState({
    name: 'Sasha',
    score: 0,
    isPlayerPlayingNow: true,
  });
  const [player2, setPlayer2] = useState({
    name: 'Nadya',
    score: 0,
    isPlayerPlayingNow: false,
  });

  const [play, { stop }] = useSound(song.url);

  return (
    <PageContainer>
      <PlayerInfo players={[player1, player2]} />
      <PlayingProcess
        song={song}
        player1={{ info: player1, setInfo: setPlayer1 }}
        player2={{ info: player2, setInfo: setPlayer2 }}
        play={play}
        stop={stop}
      />
    </PageContainer>
  );
};

export default GamePage;
