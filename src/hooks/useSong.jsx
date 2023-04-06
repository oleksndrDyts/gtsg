import { useEffect, useState } from 'react';

const getSong = songs => {
  const song = songs[Math.floor(Math.random() * (songs.length - 0) + 0)];
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
    artist: song.artist,
    track: song.track,
    text: randomedText,
    url: song.url,
  };
};

export const useSong = (songs, isNeedToRerender) => {
  const [song, setSong] = useState(() => getSong(songs));

  useEffect(() => {
    setSong(getSong(songs));
  }, [isNeedToRerender, songs]);
  return { song };
};
