import React, { useEffect, useState } from 'react';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import PlayingProcess from 'components/PlayingProcess';
import { useSsound } from 'hooks/useSsound';

// import sk from '../music/sk.mp3';

// import { songs } from 'songs';

// const song = {
//   artist: 'Скрябін',
//   text: ['Спи', 'собі', 'сама', 'коли', 'біля', 'тебе'],
//   track: 'Спи собі сама',
//   url: '../music/sk.mp3',
// };

import { songs } from 'songs';

const getSong = songss => {
  const song = songss[Math.floor(Math.random() * (songss.length - 0) + 0)];
  const songText = song.text
    .replace(/[^а-яіїєь]/gi, ' ')
    .toLowerCase()
    .split(' ')
    .filter(el => el !== '');

  const randomNumber = Math.floor(
    Math.random() * (songText.length - 6 - 0) + 0
  );

  const randomedText = songText.slice(randomNumber, randomNumber + 6);

  return {
    ...song,
    text: randomedText,
  };
};

const GamePage = () => {
  const [song, setSong] = useState(getSong(songs));
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

  useEffect(() => {
    setSong(getSong(songs));
  }, [player1.isPlayerPlayingNow]);
  // console.log(song);
  const { play, stop } = useSsound(song.url);

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
