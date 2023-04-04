import { Routes, Route } from 'react-router-dom';

import StartPage from 'pages/StartPage';
import GamePage from 'pages/GamePage';

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

const App = () => {
  const ss = getSong(songs);
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage song={ss} />} />
    </Routes>
  );
};

export default App;
