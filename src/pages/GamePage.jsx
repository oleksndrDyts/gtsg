import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from 'components/PageContainer/';
import PlayerInfo from 'components/PlayerInfo';
import PlayingProcess from 'components/PlayingProcess';
import { useSong } from 'hooks/useSong';

// import sk from '../music/sk.mp3';

import { songs } from 'songs';

const GamePage = ({ players, webSocket, typeOfConnection }) => {
  const [songFrom, setSongFrom] = useState({ artist: '', text: [], track: '' });
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

  useEffect(() => {
    if (typeOfConnection === null) {
      return;
    }

    setPlayer1(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow =
        typeOfConnection === 'create' ? true : false;
      return newState;
    });
    setPlayer2(prevState => {
      const newState = { ...prevState };
      newState.isPlayerPlayingNow =
        typeOfConnection === 'create' ? false : true;
      return newState;
    });
  }, [typeOfConnection, webSocket]);

  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (typeOfConnection === 'connect') {
      return;
    } else {
      webSocket.emit('set-song', {
        song,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);
  useEffect(() => {
    if (webSocket === null) {
      return;
    }

    if (typeOfConnection === 'create') {
      return;
    } else {
      webSocket.on('get-song', data => {
        setSongFrom(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      block={typeOfConnection !== null && player1.isPlayerPlayingNow === false}
    >
      <PlayerInfo players={[player1, player2]} />
      <PlayingProcess
        song={typeOfConnection === 'connect' ? songFrom : song}
        player1={{ info: player1, setInfo: setPlayer1 }}
        player2={{ info: player2, setInfo: setPlayer2 }}
        typeOfConnection={typeOfConnection}
        webSocket={webSocket}
        // play={play}
        // stop={stop}
      />
    </PageContainer>
  );
};

export default GamePage;
