import { useEffect, useState } from 'react';

const getSong = songs => {
  const getRandomizedNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // console.log(getRandomizedNumber(0, songs.length - 1));

  const randomForSongs = getRandomizedNumber(0, songs.length);

  // const song = songs[Math.floor(Math.random() * (songs.length - 0) + 0)];
  const song = songs[randomForSongs];
  const songText = song.text.split(' ');

  const randomNumberForRandomedText = getRandomizedNumber(
    0,
    songText.length - 5
  );

  const randomedText = songText.slice(
    randomNumberForRandomedText,
    randomNumberForRandomedText + 6
  );

  return {
    artist: song.artist,
    track: song.track,
    text: randomedText,
    url: song.url,
  };
};

export const useSong = (
  songs,
  isNeedToRerender,
  typeOfConnection,
  webSocket
) => {
  const [song, setSong] = useState({
    artist: '',
    track: '',
    text: [],
    url: '',
  });

  // setSong(getSong(songs));

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.emit('set-song', {
      song,
      typeOfConnection,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    webSocket.on('get-song', data => {
      setSong(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNeedToRerender, songs]);

  useEffect(() => {
    setSong(getSong(songs));
  }, [isNeedToRerender, songs]);

  return { song };
};
